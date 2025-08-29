import { NOTES_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  emotionId: number;
  situationId: number;
  actionId: number;
  promiseId: number;
  closingId: number;
};

export const useNoteSubmitMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({
      actionId,
      closingId,
      emotionId,
      promiseId,
      situationId,
    }: Props) => {
      const { data } = await api.post({
        path: NOTES_PATH,
        body: {
          actionId,
          closingId,
          emotionId,
          promiseId,
          situationId,
        },
      });

      return data;
    },
  });

  return mutation;
};
