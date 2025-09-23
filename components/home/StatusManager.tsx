import useMyStatusQuery from '@/hooks/api/useMyStatusQuery';
import useUpdateMyStatusMutation from '@/hooks/api/useUpdateMyStatusMutation';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
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
  initialStatus = { emoji: '', text: '' },
}: StatusManagerProps) => {
  // API 훅들
  const { data: myStatus, isLoading } = useMyStatusQuery();
  const updateMyStatusMutation = useUpdateMyStatusMutation();
  const queryClient = useQueryClient();

  // 바텀시트 ref
  const statusModalRef = useRef<BottomSheetModal>(null);
  const timePickerModalRef = useRef<BottomSheetModal>(null);

  // 상태 관리
  const [selectedCustomTime, setSelectedCustomTime] = useState<Date | null>(
    null,
  );

  // API 데이터를 로컬 상태 형식으로 변환
  const getUserStatusFromApi = (): UserStatus => {
    // API에서 상태가 없거나 null인 경우 기본값 사용
    if (!myStatus || !myStatus.emoji || !myStatus.text) {
      return initialStatus;
    }

    let endTime: Date | undefined;
    if (myStatus.statusStartedAt && myStatus.reservedTimeInfo) {
      const { hour, minute } = myStatus.reservedTimeInfo;
      if (hour !== -1 && minute !== -1) {
        const startDate = new Date(myStatus.statusStartedAt);
        startDate.setHours(startDate.getHours() + hour);
        startDate.setMinutes(startDate.getMinutes() + minute);
        endTime = startDate;
      }
    }

    return {
      emoji: myStatus.emoji,
      text: myStatus.text,
      endTime,
    };
  };

  const userStatus = getUserStatusFromApi();

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
  const handleSaveStatus = async (
    status: UserStatus,
    statusId: number,
    endTime?: Date,
  ) => {
    try {
      const now = new Date();
      let reservedTimeInfo;

      if (endTime) {
        const diffMs = endTime.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(
          (diffMs % (1000 * 60 * 60)) / (1000 * 60),
        );

        reservedTimeInfo = {
          hour: diffHours,
          minute: diffMinutes,
        };
      } else {
        // "계속 유지" 옵션
        reservedTimeInfo = {
          hour: -1,
          minute: -1,
        };
      }

      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const nowTimezoneDate = new Date(
        now.getTime() - timezoneOffset,
      ).toISOString();

      await updateMyStatusMutation.mutateAsync({
        statusId,
        startedAt: nowTimezoneDate,
        reservedTimeInfo,
      });

      handleCloseStatusModal();
    } catch (error) {
      console.error('상태 업데이트 실패:', error);
    }
  };

  if (isLoading) {
    return (
      <MyStatusSection
        onStatusPress={() => {}}
        userStatus={{ emoji: '⏳', text: '불러오는 중...' }}
      />
    );
  }

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
