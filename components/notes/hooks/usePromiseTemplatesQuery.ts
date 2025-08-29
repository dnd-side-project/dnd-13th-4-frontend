import { TEMPLATES_PROMISES_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { EmotionType } from './useClosingTemplatesQuery';

type Promise = {
  id: number;
  emotionType: EmotionType;
  text: string;
};

type PromiseList = Promise[];

type Props = {
  emotionType: EmotionType;
};

export const usePromiseTemplatesQuery = ({ emotionType }: Props) => {
  const query = useQuery({
    queryKey: [TEMPLATES_PROMISES_PATH, emotionType],
    queryFn: async () => {
      const { data } = await api.get<PromiseList>({
        path: TEMPLATES_PROMISES_PATH,
        params: { emotionType },
      });

      return data;
    },
  });

  return query;
};
