import { TEMPLATES_CLOSINGS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type Closing = {
  id: number;
  emotionType: string;
  text: string;
};

// 배열 형태라면
type ClosingList = Closing[];

export type EmotionType = 'positive' | 'negative';

type Props = {
  emotionType: EmotionType;
  enabled?: boolean;
};

export const useClosingTemplatesQuery = ({ emotionType, enabled }: Props) => {
  const query = useQuery({
    queryKey: [TEMPLATES_CLOSINGS_PATH, emotionType],
    queryFn: async () => {
      const { data } = await api.get<ClosingList>({
        path: TEMPLATES_CLOSINGS_PATH,
        params: { emotionType },
      });

      return data;
    },
    enabled,
  });

  return query;
};
