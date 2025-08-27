import { ME_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type MyData = {
  id: number;
  name: string;
  email: string;
};

export const useMeQuery = () => {
  const query = useQuery({
    queryKey: [ME_PATH],
    queryFn: async () => {
      const { data } = await api.get<MyData>({ path: ME_PATH });

      return data;
    },
  });

  return query;
};
