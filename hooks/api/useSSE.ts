import { SSE_SUBSCRIBE_PATH } from '@/constants/api';
import { getToken } from '@/lib/secureStore';
import type { SimpleNoteResponse, MemberStatusResponse } from '@/types/api';
import { useEffect, useRef, useState } from 'react';

export type SSEEventType = 'NOTE_RECEIVED' | 'MATE_STATUS_CHANGED' | 'MATE_ONLINE_STATUS';

export interface SSEEvent {
  type: SSEEventType;
  data: any;
  timestamp: string;
}

export interface NoteReceivedEvent extends SSEEvent {
  type: 'NOTE_RECEIVED';
  data: SimpleNoteResponse;
}

export interface MateStatusChangedEvent extends SSEEvent {
  type: 'MATE_STATUS_CHANGED';
  data: MemberStatusResponse;
}

export interface MateOnlineStatusEvent extends SSEEvent {
  type: 'MATE_ONLINE_STATUS';
  data: {
    isOnline: boolean;
    lastSeen: string;
  };
}

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
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 1000;

  const connect = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.warn('No token available for SSE connection');
        return;
      }

      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const baseUrl = process.env.EXPO_PUBLIC_API_URL || '';
      let url = `${baseUrl}${SSE_SUBSCRIBE_PATH}`;

      // Add event types as query parameters if specified
      if (eventTypes && eventTypes.length > 0) {
        const params = new URLSearchParams();
        eventTypes.forEach(type => params.append('eventTypes', type));
        url += `?${params.toString()}`;
      }

      const eventSource = new EventSource(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(lastEventId && { 'Last-Event-ID': lastEventId }),
        },
      });

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setIsConnected(true);
        setReconnectAttempts(0);
        onOpen?.();
      };

      eventSource.onmessage = (event) => {
        try {
          const sseEvent: SSEEvent = JSON.parse(event.data);
          setLastEventId(event.lastEventId || null);
          onEvent?.(sseEvent);
        } catch (error) {
          console.error('Error parsing SSE event:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setIsConnected(false);
        onError?.(error);

        // Attempt to reconnect
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttempts);
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectAttempts(prev => prev + 1);
            connect();
          }, delay);
        }
      };

      // Add event listeners for specific event types
      if (eventTypes) {
        eventTypes.forEach(eventType => {
          eventSource.addEventListener(eventType, (event) => {
            try {
              const sseEvent: SSEEvent = {
                type: eventType,
                data: JSON.parse(event.data),
                timestamp: new Date().toISOString(),
              };
              setLastEventId(event.lastEventId || null);
              onEvent?.(sseEvent);
            } catch (error) {
              console.error(`Error parsing ${eventType} event:`, error);
            }
          });
        });
      }

    } catch (error) {
      console.error('Error creating SSE connection:', error);
    }
  };

  const disconnect = () => {
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
  };

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, eventTypes?.join(',')]);

  return {
    isConnected,
    connect,
    disconnect,
    lastEventId,
  };
};

export default useSSE;