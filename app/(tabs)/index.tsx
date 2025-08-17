import { HomeHeader } from '@/components/home/HomeHeader';
import { MyStatusSection } from '@/components/home/MyStatusSection';
import { RoommateStatus } from '@/components/home/RoommateStatus';
import { StatisticsSummary } from '@/components/home/StatisticsSummary';
import { StatusSettingModal } from '@/components/home/StatusSettingModal';
import { TimePickerModal } from '@/components/home/TimePickerModal';
import { TodayLetters } from '@/components/home/TodayLetters';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';

export default function Home() {
  // 바텀시트 ref
  const statusModalRef = useRef<BottomSheetModal>(null);
  const timePickerModalRef = useRef<BottomSheetModal>(null);
  
  // 커스텀 시간 상태
  const [selectedCustomTime, setSelectedCustomTime] = useState<Date | null>(null);

  // 바텀시트 열기 함수
  const handleOpenStatusModal = useCallback(() => {
    statusModalRef.current?.present(0);
  }, []);

  // 바텀시트 닫기 함수
  const handleCloseStatusModal = useCallback(() => {
    statusModalRef.current?.dismiss();
  }, []);

  // 커스텀 시간 선택 모달 열기
  const handleOpenTimePickerModal = useCallback(() => {
    timePickerModalRef.current?.present();
  }, []);

  // 시간 선택 완료 핸들러
  const handleTimeSelect = useCallback((time: Date) => {
    setSelectedCustomTime(time);
  }, []);

  // TimePickerModal 닫기 핸들러
  const handleCloseTimePickerModal = useCallback(() => {
    timePickerModalRef.current?.dismiss();
  }, []);

  return (
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
      <MyStatusSection onStatusPress={handleOpenStatusModal} />

      <StatusSettingModal
        ref={statusModalRef}
        onClose={handleCloseStatusModal}
        onCustomTimePress={handleOpenTimePickerModal}
        selectedCustomTime={selectedCustomTime}
      />

      <TimePickerModal
        ref={timePickerModalRef}
        onTimeSelect={handleTimeSelect}
        onClose={handleCloseTimePickerModal}
      />
    </SafeScreenLayout>
  );
}
