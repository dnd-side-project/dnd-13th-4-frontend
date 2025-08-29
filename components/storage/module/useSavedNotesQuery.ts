import { NOTES_SAVED_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// 감정 정보
type Emotion = {
  id: number;
  emotionType: string;
  text: string;
  graphicUrl: string;
};

// 액션 정보
type Action = {
  id: number;
  text: string;
};

// 상황 정보
type Situation = {
  id: number;
  emotionType: string;
  text: string;
};

// 약속 정보
type PromiseData = {
  id: number;
  emotionType: string;
  text: string;
};

// 마무리 멘트 정보
type Closing = {
  id: number;
  emotionType: string;
  text: string;
};

// 메세지 타입
export type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  roomId: number;
  emotion: Emotion;
  action: Action;
  situation: Situation;
  promise: PromiseData;
  closing: Closing;
  sequence: number;
  isRead: boolean;
  isSaved: boolean;
  createdAt: string; // ISO8601 datetime string
};

// 메세지 배열
export type MessageList = Message[];

const MOCK_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  date: '25.08.07',
  kind: 'awkward' as const,
}));

export const useSavedNotesQuery = () => {
  const query = useQuery({
    queryKey: [NOTES_SAVED_PATH],
    queryFn: async () => {
      const { data } = await api.get<MessageList>({ path: NOTES_SAVED_PATH });

      return data;
    },
  });

  return query;
};
