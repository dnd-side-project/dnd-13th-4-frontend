import { getNoteSavePath } from '@/constants/api';
import { api } from '@/lib/api';
import type { NoteType } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

const saveNote = async (noteId: number) => {
  const { data } = await api.patch<NoteType>({
    path: getNoteSavePath(noteId),
  });
  return data;
};

const useSaveNoteMutation = () => {
  const mutation = useMutation({
    mutationFn: saveNote,
  });

  return mutation;
};

export default useSaveNoteMutation;
