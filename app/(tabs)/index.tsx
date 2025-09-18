import { HomeHeader } from '@/components/home/HomeHeader';
import { RoommateStatus } from '@/components/home/RoommateStatus';
import StatisticsSummary from '@/components/home/StatisticsSummary';
import { StatusManager } from '@/components/home/StatusManager';
import { TodayLetters } from '@/components/home/TodayLetters';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { ScrollView } from 'react-native';

export default function Home() {
  return (
    <>
      <SafeScreenLayout
        background={{
          type: 'gradient',
          colors: ['#ECF5FF', '#FFFFFF'] as const,
          locations: [0.149, 0.4087] as const,
        }}
        style={{
          paddingTop: 56,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode='never'
        >
          <HomeHeader />
          <TodayLetters />
          <RoommateStatus />
          <StatisticsSummary />
        </ScrollView>
        <StatusManager />
      </SafeScreenLayout>
    </>
  );
}
