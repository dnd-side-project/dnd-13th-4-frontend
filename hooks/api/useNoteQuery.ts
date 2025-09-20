import { getNotePath } from '@/constants/api';
import { api } from '@/lib/api';
import type { NoteType } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  noteId: number;
};

const getNote = async (noteId: number) => {
  const { data } = await api.get<NoteType>({
    path: getNotePath(noteId),
  });
  return data;
};

const useNoteQuery = ({ noteId }: Props) => {
  const query = useQuery({
    queryKey: [getNotePath(noteId)],
    queryFn: () => getNote(noteId),
  });

  return query;
};

export default useNoteQuery;
