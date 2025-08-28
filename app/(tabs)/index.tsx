import { HomeHeader } from '@/components/home/HomeHeader';
import { RoommateStatus } from '@/components/home/RoommateStatus';
import StatisticsSummary from '@/components/home/StatisticsSummary';
import { StatusManager } from '@/components/home/StatusManager';
import { TodayLetters } from '@/components/home/TodayLetters';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import TutorialOverlay from '@/components/tutorial/TutorialOverlay';

export default function Home() {
  return (
    <>
      <SafeScreenLayout
        header={<HomeHeader />}
        background={{
          type: 'gradient',
          colors: ['#ECF5FF', '#FFFFFF'] as const,
          locations: [0.149, 0.4087] as const,
        }}
      >
        <TodayLetters />
        <RoommateStatus />
        <StatisticsSummary />
        <StatusManager />
      </SafeScreenLayout>
      
      <TutorialOverlay tutorialKey="home_tutorial_completed" />
    </>
  );
}
