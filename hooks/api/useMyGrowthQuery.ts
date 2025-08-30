import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
import { MY_GROWTH_PATH } from '@/constants/api';
import { api } from '@/lib/api';
import type { GrowthResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getMyGrowth = async () => {
  const { data } = await api.get<GrowthResponse>({
    path: MY_GROWTH_PATH,
  });

  const processedData = data.weeklyPositiveNoteCounts
    .map((item, index, array) => {
      // 3개 위치에만 라벨 표시: 첫째, 중간, 마지막
      let label = '';
      const reverseIndex = array.length - 1 - index; // reverse 후의 인덱스
      const lastIdx = array.length - 1;
      const middleIdx = Math.round(lastIdx / 2);

      if (reverseIndex === 0) label = '2개월전';
      else if (reverseIndex === middleIdx) label = '1개월전';
      else if (reverseIndex === lastIdx) label = '현재';

      return {
        ...item,
        label,
        value: item.count,
      };
    })
    .reverse();

  return {
    ...data,
    weeklyPositiveNoteCounts: processedData,
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
        monthlyChange: 0,
      },
      decreasedNegativeAction: {
        text: '',
        monthlyChange: 0,
      },
      weeklyPositiveNoteCounts: [],
    },
  });

  return query;
};

export default useMyGrowthQuery;
