import { MATE_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type MateData = {
  id: number;
  name: string;
  image: string;
  joinedAt: string;
};

export const useMateQuery = () => {
  const query = useQuery({
    queryKey: [MATE_PATH],
    queryFn: async () => {
      const { data } = await api.get<MateData>({ path: MATE_PATH });

      return data;
    },
  });

  return query;
};
