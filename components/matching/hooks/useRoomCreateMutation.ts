import { ROOMS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type RoomData = {
  id: number;
  code: string;
};

export const useRoomCreateQuery = () => {
  const query = useQuery({
    queryKey: [ROOMS_PATH],
    queryFn: async () => {
      const { data } = await api.post<RoomData>({ path: ROOMS_PATH });

      return data;
    },
    staleTime: Infinity,
  });

  return query;
};
