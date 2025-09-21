import { ME_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteAccountMutation = () => {
  const mutation = useMutation({
    mutationFn: () =>
      api.delete({
        path: ME_PATH,
      }),
  });

  return mutation;
};
