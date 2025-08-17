import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useState, useEffect } from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerModalProps {
  onTimeSelect: (time: Date) => void;
  onClose: () => void;
}

export const TimePickerModal = forwardRef<
  BottomSheetModal,
  TimePickerModalProps
>(({ onTimeSelect, onClose }, ref) => {
  const snapPoints = ['60%'];
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // 현재 시간에서 30분 후를 최소값으로 설정
  const getMinimumTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now;
  };

  // 현재 시간에서 12시간 후를 최대값으로 설정
  const getMaximumTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 12);
    return now;
  };

  // 30분 단위로 시간 조정
  const roundToNearestHalfHour = (date: Date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / 30) * 30;
    const newDate = new Date(date);
    newDate.setMinutes(roundedMinutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  // 모달이 열릴 때 기본 시간 설정
  useEffect(() => {
    const defaultTime = getMinimumTime();
    setSelectedTime(roundToNearestHalfHour(defaultTime));
  }, []);

  // 시간 선택 핸들러
  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const roundedTime = roundToNearestHalfHour(selectedDate);
      const minTime = getMinimumTime();
      const maxTime = getMaximumTime();
      
      // 최소/최대 시간 범위 내에서만 허용
      if (roundedTime >= minTime && roundedTime <= maxTime) {
        setSelectedTime(roundedTime);
      }
    }
  };

  // 완료 버튼 핸들러
  const handleConfirm = () => {
    if (selectedTime) {
      onTimeSelect(selectedTime);
    }
    onClose();
  };

  // 백드롭 컴포넌트 렌더 함수
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[props.style, { background: 'rgba(107, 118, 132, 0.50)' }]}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleStyle={{ display: 'none' }}
      backgroundStyle={styles.background}
      style={styles.container}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      animateOnMount={true}
    >
      <BottomSheetView style={styles.content}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <CustomText variant='body1' color={GreyColors.grey600}>
              취소
            </CustomText>
          </Pressable>
          <CustomText variant='body1' fontWeight='semibold' style={styles.title}>
            시간 설정
          </CustomText>
          <Pressable onPress={handleConfirm} style={styles.confirmButton}>
            <CustomText variant='body1' color={PrimaryColors.blue100} fontWeight='semibold'>
              완료
            </CustomText>
          </Pressable>
        </View>

        {/* 시간 선택기 */}
        <View style={styles.timePickerContainer}>
          {selectedTime && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              minimumDate={getMinimumTime()}
              maximumDate={getMaximumTime()}
              minuteInterval={30}
              style={styles.timePicker}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

TimePickerModal.displayName = 'TimePickerModal';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  background: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    flex: 1,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: GreyColors.grey200,
  },
  closeButton: {
    paddingVertical: 8,
  },
  confirmButton: {
    paddingVertical: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  timePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timePicker: {
    width: '100%',
    height: 200,
  },
});