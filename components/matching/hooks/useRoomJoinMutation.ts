import { ROOMS_JOIN_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  roomCode: string;
};

export const useRoomJoinMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({ roomCode }: Props) => {
      const { data } = await api.post({
        path: ROOMS_JOIN_PATH,
        body: { roomCode },
      });

      return data;
    },
  });

  return mutation;
};
