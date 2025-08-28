import { STATUS_LIST_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { StatusResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

// API Function
const getStatusList = async () => {
  const { data } = await api.get<StatusResponse[]>({
    path: STATUS_LIST_PATH,
  });
  return data;
};

// Query Hook
const useStatusListQuery = () => {
  const query = useQuery({
    queryKey: [STATUS_LIST_PATH],
    queryFn: getStatusList,
  });

  return query;
};

export default useStatusListQuery;