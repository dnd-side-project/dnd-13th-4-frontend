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
  const query = useQuery({
    queryKey: [MY_STATUS_PATH],
    queryFn: getMyStatus,
  });

  return query;
};

export default useMyStatusQuery;