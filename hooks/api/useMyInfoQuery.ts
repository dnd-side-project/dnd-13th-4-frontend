import { MY_INFO_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { MemberResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getMyInfo = async () => {
  const { data } = await api.get<MemberResponse>({
    path: MY_INFO_PATH,
  });
  return data;
};

const useMyInfoQuery = () => {
  const query = useQuery({
    queryKey: [MY_INFO_PATH],
    queryFn: getMyInfo,
  });

  return query;
};

export default useMyInfoQuery;