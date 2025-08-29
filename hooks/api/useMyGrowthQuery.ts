import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
import { MY_GROWTH_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { GrowthResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getMyGrowth = async () => {
  const { data } = await api.get<GrowthResponse>({
    path: MY_GROWTH_PATH,
  });
  return {
    ...data,
    weeklyPositiveNoteCounts: data.weeklyPositiveNoteCounts.map((item) => ({
      label: `${item.weeksAgo}주차`,
      value: item.count,
    })),
  };
};

const useMyGrowthQuery = () => {
  const isMatched = useIsMatched();

  const query = useQuery({
    queryKey: [MY_GROWTH_PATH],
    queryFn: getMyGrowth,
    enabled: isMatched,
    initialData: {
      increasedPositiveAction: {
        text: '',
        change: 0,
      },
      decreasedNegativeAction: {
        text: '',
        change: 0,
      },
      weeklyPositiveNoteCounts: [],
    },
  });

  return query;
};

export default useMyGrowthQuery;
