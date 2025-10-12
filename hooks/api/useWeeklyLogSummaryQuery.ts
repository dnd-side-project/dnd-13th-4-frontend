import { useIsMatched } from '@/components/mypage/hooks/useMeQuery';
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
  const isMatched = useIsMatched();

  const query = useQuery({
    queryKey: [WEEKLY_LOG_SUMMARY_PATH],
    queryFn: getWeeklyLogSummary,
    enabled: isMatched,
    initialData: {
      notesSentThisWeek: 0,
      notesReceivedThisWeek: 0,
      totalNotesExchanged: 0,
      roomJoinedAt: new Date().toISOString(),
    },
  });

  return query;
};

export default useWeeklyLogSummaryQuery;
