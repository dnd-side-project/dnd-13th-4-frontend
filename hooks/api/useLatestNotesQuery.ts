import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
import { LATEST_NOTES_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { SimpleNoteResponse } from '@/types/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useSSE, { isNoteReceivedEvent } from './useSSE';

const getLatestNotes = async () => {
  const { data } = await api.get<SimpleNoteResponse[]>({
    path: LATEST_NOTES_PATH,
  });

  return data;
};

const useLatestNotesQuery = () => {
  const isMatched = useIsMatched();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [LATEST_NOTES_PATH],
    queryFn: getLatestNotes,
    enabled: isMatched,
    initialData: [],
    staleTime: Infinity, // SSE로 실시간 업데이트하므로 polling 비활성화
  });

  // SSE 연결 설정
  useSSE({
    enabled: isMatched,
    eventTypes: ['NOTE_RECEIVED'],
    onEvent: (event) => {
      if (isNoteReceivedEvent(event)) {
        // 기존 데이터에 새 쪽지 추가
        queryClient.setQueryData<SimpleNoteResponse[]>([LATEST_NOTES_PATH], (oldData) => {
          if (!oldData) return [event.data];

          // 중복 확인 후 추가
          const exists = oldData.some(note => note.id === event.data.id);
          if (exists) return oldData;

          // 최신순으로 정렬하여 추가
          return [event.data, ...oldData];
        });
      }
    },
    onError: (error) => {
      console.error('SSE connection error in useLatestNotesQuery:', error);
      // SSE 연결 실패 시 fallback으로 쿼리 재시도
      query.refetch();
    },
  });

  return query;
};

export default useLatestNotesQuery;
