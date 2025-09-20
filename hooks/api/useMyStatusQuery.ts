import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
import { MY_STATUS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { MemberStatusResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getMyStatus = async () => {
  const { data } = await api.get<MemberStatusResponse>({
    path: MY_STATUS_PATH,
  });
  return data;
};

const useMyStatusQuery = () => {
  const isMatched = useIsMatched();

  const query = useQuery({
    queryKey: [MY_STATUS_PATH],
    queryFn: getMyStatus,
    enabled: isMatched,
    initialData: {
      emoji: null,
      text: null,
      statusStartedAt: null,
      reservedTimeInfo: null,
    },
  });

  return query;
};

export default useMyStatusQuery;
