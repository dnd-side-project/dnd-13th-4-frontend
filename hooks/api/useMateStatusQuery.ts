import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
import { MATE_STATUS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { MemberStatusResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getMateStatus = async () => {
  const { data } = await api.get<MemberStatusResponse>({
    path: MATE_STATUS_PATH,
  });
  return data;
};

const useMateStatusQuery = () => {
  const isMatched = useIsMatched();

  const query = useQuery({
    queryKey: [MATE_STATUS_PATH],
    queryFn: getMateStatus,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    enabled: isMatched,
    initialData: {
      emoji: null,
      text: null,
      request: '',
      statusStartedAt: null,
      reservedTimeInfo: null,
    },
  });

  return query;
};

export default useMateStatusQuery;
