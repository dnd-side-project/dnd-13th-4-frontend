import { api } from '@/lib/api';
import type { StatisticsResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const WEEKLY_LOG_SUMMARY_PATH = '/log/statistics';

const getWeeklyLogSummary = async () => {
  const { data } = await api.get<StatisticsResponse>({
    path: WEEKLY_LOG_SUMMARY_PATH,
  });
  return data;
};

const useWeeklyLogSummaryQuery = () => {
  const query = useQuery({
    queryKey: [WEEKLY_LOG_SUMMARY_PATH],
    queryFn: getWeeklyLogSummary,
    enabled: process.env.EXPO_PUBLIC_IS_MATCHED === 'true',
    initialData: {
      notesSentThisWeek: 0,
      notesReceivedThisWeek: 0,
      roomJoinedAt: new Date().toISOString(),
    },
  });

  return query;
};

export default useWeeklyLogSummaryQuery;