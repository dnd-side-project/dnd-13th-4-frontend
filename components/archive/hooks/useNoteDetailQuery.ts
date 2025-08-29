import { getNotePath } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  noteId: number;
};

export const useNoteDetailQuery = ({ noteId }: Props) => {
  const query = useQuery({
    queryKey: [getNotePath(noteId)],
    queryFn: async () => {
      const { data } = await api.get({
        path: getNotePath(noteId),
      });

      return data;
    },
  });

  return query;
};
