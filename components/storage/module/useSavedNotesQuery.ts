import { NOTES_SAVED_PATH } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

const DATA = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  date: '25.08.07',
  kind: 'awkward' as const,
}));

export const useSavedNotesQuery = () => {
  const query = useQuery({
    queryKey: [NOTES_SAVED_PATH],
    queryFn: async () => {
      // TODO : API 연동
      //   const { data } = await api.get({ path: NOTES_SAVED_PATH });
      const data = DATA;

      return data;
    },
  });

  return query;
};
