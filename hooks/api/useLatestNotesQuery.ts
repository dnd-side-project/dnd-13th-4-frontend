import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
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
  const isMatched = useIsMatched();

  const query = useQuery({
    queryKey: [LATEST_NOTES_PATH],
    queryFn: getLatestNotes,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    enabled: isMatched,
    initialData: [],
  });

  return query;
};

export default useLatestNotesQuery;
