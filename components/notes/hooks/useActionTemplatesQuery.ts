import { TEMPLATES_ACTIONS_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { EmotionType } from './useClosingTemplatesQuery';

type SubAction = {
  id: number;
  text: string;
};

type Action = {
  id: number;
  emotionType: string;
  name: string;
  actions: SubAction[];
};

type ActionList = Action[];

type Props = {
  emotionType: EmotionType;
};

export const useActionTemplatesQuery = ({ emotionType }: Props) => {
  const query = useQuery({
    queryKey: [TEMPLATES_ACTIONS_PATH, emotionType],
    queryFn: async () => {
      const { data } = await api.get<ActionList>({
        path: TEMPLATES_ACTIONS_PATH,
        params: { emotionType },
      });

      return data;
    },
  });

  return query;
};
