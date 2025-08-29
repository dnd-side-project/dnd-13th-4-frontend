import { TEMPLATES_SITUATIONS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { EmotionType } from './useClosingTemplatesQuery';

type Situation = {
  id: number;
  emotionType: string;
  text: string;
};

// 배열 형태라면
type SituationList = Situation[];

type Props = {
  emotionType: EmotionType;
};

export const useSituationTemplatesQuery = ({ emotionType }: Props) => {
  const query = useQuery({
    queryKey: [TEMPLATES_SITUATIONS_PATH, emotionType],
    queryFn: async () => {
      const { data } = await api.get<SituationList>({
        path: TEMPLATES_SITUATIONS_PATH,
        params: { emotionType },
      });

      return data;
    },
  });

  return query;
};
