import { EMOTION_TEMPLATE_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  emotionType: 'positive' | 'negative';
};

const useEmotionTemplatesQuery = ({ emotionType }: Props) => {
  const query = useQuery({
    queryKey: [EMOTION_TEMPLATE_PATH, emotionType], // NOTE : 여기는 담당 개발자 판단에 따라
    queryFn: async () => {
      const { data } = await api.get<
        {
          id: number;
          emotionType: string;
          text: string;
        }[]
      >({
        path: EMOTION_TEMPLATE_PATH,
        params: { emotionType: emotionType },
      });

      return data;
    },
  });

  return query;
};
export default useEmotionTemplatesQuery;
