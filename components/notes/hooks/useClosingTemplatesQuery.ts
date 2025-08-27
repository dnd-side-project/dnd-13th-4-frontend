import { useQuery } from '@tanstack/react-query';

export const useClosingTemplatesQuery = () => {
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
