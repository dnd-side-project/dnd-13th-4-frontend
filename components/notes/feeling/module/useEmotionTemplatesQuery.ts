import { EMOTION_TEMPLATE_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { EmotionType } from '../../hooks/useClosingTemplatesQuery';

export type Emotion = {
  id: number;
  emotionType: EmotionType;
  text: string;
  selectionImageUrl: string;
  previewImageUrl: string;
  archiveImageUrl: string;
  homeThumbnailUrl: string;
};

export type EmotionList = Emotion[];

export const useEmotionTemplatesQuery = () => {
  const query = useQuery({
    queryKey: [EMOTION_TEMPLATE_PATH, 'all'],
    queryFn: async () => {
      const [positiveRes, negativeRes] = await Promise.all([
        api.get<EmotionList>({
          path: EMOTION_TEMPLATE_PATH,
          params: { emotionType: 'positive' },
        }),
        api.get<EmotionList>({
          path: EMOTION_TEMPLATE_PATH,
          params: { emotionType: 'negative' },
        }),
      ]);

      const result = [...positiveRes.data, ...negativeRes.data].sort(
        (a, b) => a.id - b.id,
      );

      return result;
    },
  });

  return query;
};
