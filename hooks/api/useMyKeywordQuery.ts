import { api } from '@/lib/api';
import type { KeywordResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const MY_KEYWORD_PATH = '/log/keywords';

const getMyKeyword = async () => {
  const { data } = await api.get<KeywordResponse>({
    path: MY_KEYWORD_PATH,
  });
  return data;
};

const useMyKeywordQuery = () => {
  const query = useQuery({
    queryKey: [MY_KEYWORD_PATH],
    queryFn: getMyKeyword,
    enabled: process.env.EXPO_PUBLIC_IS_MATCHED === 'true',
    initialData: {
      positiveActionCategory: {
        id: 0,
        emotionType: 'POSITIVE',
        name: '기본 카테고리',
      },
      negativeActionCategory: {
        id: 0,
        emotionType: 'NEGATIVE',
        name: '기본 카테고리',
      },
    },
  });

  return query;
};

export default useMyKeywordQuery;