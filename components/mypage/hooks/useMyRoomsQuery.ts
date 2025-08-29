import { ROOMS_MY_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type Room = {
  id: number;
  code: string;
};

export const useMyRoomsQuery = () => {
  const query = useQuery({
    queryKey: [ROOMS_MY_PATH],
    queryFn: async () => {
      const { data } = await api.get<Room>({
        path: ROOMS_MY_PATH,
      });

      return data;
    },
  });

  return query;
};
