import { SSE_SUBSCRIBE_PATH } from '@/constants/api';
import { tokenStorage } from '@/lib/auth/tokenStorage';
import type { MemberStatusResponse, SimpleNoteResponse } from '@/types/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import EventSource from 'react-native-sse';

export type SSEEventType =
  | 'NOTE_RECEIVED'
  | 'MATE_STATUS_CHANGED'
  | 'MATE_ONLINE_STATUS';

export interface SSEEvent<T = any> {
  type: SSEEventType;
  data: T;
  timestamp: string;
}

export interface NoteReceivedEvent extends SSEEvent<SimpleNoteResponse> {
  type: 'NOTE_RECEIVED';
}

export interface MateStatusChangedEvent extends SSEEvent<MemberStatusResponse> {
  type: 'MATE_STATUS_CHANGED';
}

export interface MateOnlineStatusEvent
  extends SSEEvent<{
    isOnline: boolean;
    lastSeen: string;
  }> {
  type: 'MATE_ONLINE_STATUS';
}

// Type union for all possible SSE events
export type AnySSEEvent =
  | NoteReceivedEvent
  | MateStatusChangedEvent
  | MateOnlineStatusEvent;

// Type guard functions
export const isNoteReceivedEvent = (
  event: SSEEvent,
): event is NoteReceivedEvent => {
  return event.type === 'NOTE_RECEIVED';
};

export const isMateStatusChangedEvent = (
  event: SSEEvent,
): event is MateStatusChangedEvent => {
  return event.type === 'MATE_STATUS_CHANGED';
};

export const isMateOnlineStatusEvent = (
  event: SSEEvent,
): event is MateOnlineStatusEvent => {
  return event.type === 'MATE_ONLINE_STATUS';
};

interface UseSSEOptions {
  enabled?: boolean;
  eventTypes?: SSEEventType[];
  onEvent?: (event: SSEEvent) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

const useSSE = (options: UseSSEOptions = {}) => {
  const {
    enabled = true,
    eventTypes,
    onEvent,
    onError,
    onOpen,
    onClose,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [lastEventId, setLastEventId] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 1000;

  const connect = useCallback(async () => {
    try {
      const token = await tokenStorage.getAccessToken();
      if (!token) {
        console.warn('No token available for SSE connection');
        return;
      }

      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      if (!baseUrl) {
        console.error(
          'EXPO_PUBLIC_API_URL is not set. Cannot create SSE connection.',
        );
        return;
      }

      const url = new URL(`${baseUrl}${SSE_SUBSCRIBE_PATH}`);

      // Add event types as query parameters if specified
      if (eventTypes && eventTypes.length > 0) {
        eventTypes.forEach((type) =>
          url.searchParams.append('eventTypes', type),
        );
      }

      if (lastEventId) {
        url.searchParams.set('lastEventId', lastEventId);
      }

      // react-native-sse supports headers
      const eventSource = new EventSource(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      eventSourceRef.current = eventSource;

      eventSource.addEventListener('open', () => {
        console.log('SSE connection opened');
        setIsConnected(true);
        setReconnectAttempts(0);
        onOpen?.();
      });

      eventSource.addEventListener('error', (error: any) => {
        console.error('SSE connection error:', error);
        setIsConnected(false);
        onError?.(error);

        // Attempt to reconnect
        setReconnectAttempts((prevAttempts) => {
          if (prevAttempts < MAX_RECONNECT_ATTEMPTS) {
            const delay = RECONNECT_DELAY * Math.pow(2, prevAttempts);
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, delay);
            return prevAttempts + 1;
          }
          return prevAttempts;
        });
      });

      // Add event listeners for specific event types
      const eventTypesToListen = eventTypes || [
        'NOTE_RECEIVED',
        'MATE_STATUS_CHANGED',
        'MATE_ONLINE_STATUS',
      ];

      eventTypesToListen.forEach((eventType) => {
        eventSource.addEventListener('message', (event: any) => {
          try {
            const parsedData = JSON.parse(event.data);
            // Check if this message is for the event type we want
            if (parsedData.type === eventType) {
              const sseEvent: SSEEvent = {
                type: eventType,
                data: parsedData.data || parsedData,
                timestamp: new Date().toISOString(),
              };
              setLastEventId(event.lastEventId || null);
              onEvent?.(sseEvent);
            }
          } catch (error) {
            console.error(`Error parsing SSE event:`, error);
          }
        });
      });
    } catch (error) {
      console.error('Error creating SSE connection:', error);
    }
  }, [eventTypes, lastEventId, onEvent, onOpen, onError]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setIsConnected(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled]);

  return {
    isConnected,
    connect,
    disconnect,
    lastEventId,
  };
};

export default useSSE;
