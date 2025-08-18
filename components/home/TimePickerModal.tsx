import { CustomText } from '@/components/CustomText';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

interface TimePickerModalProps {
  onTimeSelect: (time: Date) => void;
  onClose: () => void;
}

export const TimePickerModal = forwardRef<
  BottomSheetModal,
  TimePickerModalProps
>(({ onTimeSelect, onClose }, ref) => {
  const snapPoints = ['55%'];
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // 모달이 열릴 때 기본 시간을 1시간 후로 설정
  useEffect(() => {
    const baseTime = new Date();
    baseTime.setHours(1, 0, 0, 0); // 1시간 0분으로 설정 (duration용)
    setSelectedTime(baseTime);
  }, []);

  // 시간 선택 핸들러
  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      // 선택된 시간의 시와 분을 추출
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();

      // 0-12시간, 분은 0 또는 30분으로 제한
      const limitedHours = Math.min(12, hours);
      const limitedMinutes = minutes >= 30 ? 30 : 0;

      const newTime = new Date();
      newTime.setHours(limitedHours, limitedMinutes, 0, 0);
      setSelectedTime(newTime);
    }
  };

  // 완료 버튼 핸들러
  const handleConfirm = () => {
    if (selectedTime) {
      // 선택된 시간을 duration으로 변환하여 현재 시간에 더함
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const now = new Date();
      const futureTime = new Date(
        now.getTime() + (hours * 60 + minutes) * 60 * 1000,
      );
      onTimeSelect(futureTime);
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
          <CustomText
            variant='body1'
            fontWeight='semibold'
            style={styles.title}
          >
            시간 설정
          </CustomText>
          <Pressable onPress={handleConfirm} style={styles.confirmButton}>
            <CustomText
              variant='body1'
              color={PrimaryColors.blue100}
              fontWeight='semibold'
            >
              완료
            </CustomText>
          </Pressable>
        </View>

        {/* 설명 텍스트 */}
        <View style={styles.instructionContainer}>
          <CustomText
            variant='body2'
            color={GreyColors.grey600}
            style={styles.instructionText}
          >
            몇 시간 후까지 상태를 유지할지 선택해주세요
          </CustomText>
          <CustomText
            variant='body3'
            color={GreyColors.grey500}
            style={styles.instructionSubText}
          >
            시간: 0~12시간, 분: 10분 단위로 선택 가능
          </CustomText>
        </View>

        {/* 시간 선택기 */}
        <View style={styles.timePickerContainer}>
          {selectedTime && (
            <DateTimePicker
              value={selectedTime}
              mode='time'
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
              minuteInterval={10}
              style={styles.timePicker}
            />
          )}
        </View>

        {/* 미리보기 */}
        {selectedTime && (
          <View style={styles.previewContainer}>
            <CustomText
              variant='body2'
              color={PrimaryColors.blue100}
              fontWeight='semibold'
              style={styles.previewText}
            >
              {selectedTime.getHours()}시간 {selectedTime.getMinutes()}분 후까지
              상태가 유지됩니다
            </CustomText>
          </View>
        )}
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
  instructionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  instructionText: {
    textAlign: 'center',
    marginBottom: 4,
  },
  instructionSubText: {
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
  previewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  previewText: {
    textAlign: 'center',
  },
});
