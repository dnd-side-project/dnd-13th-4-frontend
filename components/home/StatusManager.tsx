import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { MyStatusSection } from './MyStatusSection';
import { StatusSettingModal } from './StatusSettingModal';
import { TimePickerModal } from './TimePickerModal';

// 상태 타입 정의
interface UserStatus {
  emoji: string;
  text: string;
  endTime?: Date;
}

interface StatusManagerProps {
  initialStatus?: UserStatus;
}

export const StatusManager = ({ 
  initialStatus = { emoji: '🚌', text: '외출 중' }
}: StatusManagerProps) => {
  // 바텀시트 ref
  const statusModalRef = useRef<BottomSheetModal>(null);
  const timePickerModalRef = useRef<BottomSheetModal>(null);
  
  // 상태 관리
  const [userStatus, setUserStatus] = useState<UserStatus>(initialStatus);
  const [selectedCustomTime, setSelectedCustomTime] = useState<Date | null>(null);

  // 바텀시트 열기 함수
  const handleOpenStatusModal = () => {
    statusModalRef.current?.present(0);
  };

  // 바텀시트 닫기 함수
  const handleCloseStatusModal = () => {
    statusModalRef.current?.dismiss();
  };

  // 커스텀 시간 선택 모달 열기
  const handleOpenTimePickerModal = () => {
    timePickerModalRef.current?.present();
  };

  // 시간 선택 완료 핸들러
  const handleTimeSelect = (time: Date) => {
    setSelectedCustomTime(time);
  };

  // TimePickerModal 닫기 핸들러
  const handleCloseTimePickerModal = () => {
    timePickerModalRef.current?.dismiss();
  };

  // 상태 저장 핸들러
  const handleSaveStatus = (status: UserStatus, endTime?: Date) => {
    setUserStatus({ ...status, endTime });
    handleCloseStatusModal();
  };

  return (
    <>
      <MyStatusSection 
        onStatusPress={handleOpenStatusModal} 
        userStatus={userStatus}
      />

      <StatusSettingModal
        ref={statusModalRef}
        onClose={handleCloseStatusModal}
        onCustomTimePress={handleOpenTimePickerModal}
        selectedCustomTime={selectedCustomTime}
        onSave={handleSaveStatus}
        currentStatus={userStatus}
      />

      <TimePickerModal
        ref={timePickerModalRef}
        onTimeSelect={handleTimeSelect}
        onClose={handleCloseTimePickerModal}
      />
    </>
  );
};