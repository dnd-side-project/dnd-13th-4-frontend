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
  const query = useQuery({
    queryKey: [MATE_STATUS_PATH],
    queryFn: getMateStatus,
  });

  return query;
};

export default useMateStatusQuery;