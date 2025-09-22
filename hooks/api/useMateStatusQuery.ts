import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
import { MATE_STATUS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { MemberStatusResponse } from '@/types/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useSSE, { type MateStatusChangedEvent } from './useSSE';

const getMateStatus = async () => {
  const { data } = await api.get<MemberStatusResponse>({
    path: MATE_STATUS_PATH,
  });
  return data;
};

const useMateStatusQuery = () => {
  const isMatched = useIsMatched();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [MATE_STATUS_PATH],
    queryFn: getMateStatus,
    enabled: isMatched,
    initialData: {
      emoji: null,
      text: null,
      request: '',
      statusStartedAt: null,
      reservedTimeInfo: null,
    },
    staleTime: Infinity, // SSE로 실시간 업데이트하므로 polling 비활성화
  });

  // SSE 연결 설정
  useSSE({
    enabled: isMatched,
    eventTypes: ['MATE_STATUS_CHANGED'],
    onEvent: (event) => {
      if (event.type === 'MATE_STATUS_CHANGED') {
        const statusEvent = event as MateStatusChangedEvent;

        // 룸메 상태 업데이트
        queryClient.setQueryData<MemberStatusResponse>([MATE_STATUS_PATH], () => {
          return statusEvent.data;
        });
      }
    },
    onError: (error) => {
      console.error('SSE connection error in useMateStatusQuery:', error);
      // SSE 연결 실패 시 fallback으로 쿼리 재시도
      query.refetch();
    },
  });

  return query;
};

export default useMateStatusQuery;
