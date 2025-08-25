import { LATEST_NOTES_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { NoteResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getLatestNotes = async () => {
  const { data } = await api.get<NoteResponse[]>({
    path: LATEST_NOTES_PATH,
  });
  return data;
};

const useLatestNotesQuery = () => {
  const query = useQuery({
    queryKey: [LATEST_NOTES_PATH],
    queryFn: getLatestNotes,
  });

  return query;
};

export default useLatestNotesQuery;