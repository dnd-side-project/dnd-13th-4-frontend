import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

interface StatusSettingModalProps {
  onClose: () => void;
  onCustomTimePress: () => void;
  selectedCustomTime: Date | null;
}

export const StatusSettingModal = forwardRef<
  BottomSheetModal,
  StatusSettingModalProps
>(({ onClose, onCustomTimePress, selectedCustomTime }, ref) => {
  const snapPoints = ['100%'];

  // 선택된 커스텀 시간을 텍스트로 변환
  const getCustomTimeText = () => {
    if (!selectedCustomTime) return '직접 설정';
    
    const now = new Date();
    const diffInMinutes = Math.round((selectedCustomTime.getTime() - now.getTime()) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    if (hours === 0) {
      return `${minutes}분 후`;
    } else if (minutes === 0) {
      return `${hours}시간 후`;
    } else {
      return `${hours}시간 ${minutes}분 후`;
    }
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
          <Pressable onPress={onClose} style={styles.closeIcon}>
            <Icon name='close' size={24} color={GreyColors.grey600} />
          </Pressable>
          <CustomText variant='body1' style={styles.title}>
            나의 상태 설정
          </CustomText>
          <Pressable style={styles.saveButton}>
            <CustomText variant='body1' style={styles.saveButtonText}>
              저장
            </CustomText>
          </Pressable>
        </View>

        {/* 지금 어떤 상태인가요? */}
        <View style={styles.section}>
          <CustomText variant='body1' style={styles.sectionTitle}>
            지금 어떤 상태인가요?
          </CustomText>

          <View style={styles.customStatusSection}>
            <CustomText variant='body2' style={styles.customLabel}>
              집
            </CustomText>
            <View style={styles.statusGrid}>
              <View style={styles.statusRow}>
                <Pressable style={styles.statusCard}>
                  <CustomText style={styles.statusText}>
                    💻 작업 중
                  </CustomText>
                </Pressable>
                <Pressable style={styles.statusCard}>
                  <CustomText style={styles.statusText}>
                    🌿 휴식 중
                  </CustomText>
                </Pressable>
              </View>
              <View style={styles.statusRow}>
                <Pressable style={styles.statusCard}>
                  <CustomText style={styles.statusText}>
                    🌙 취침 중
                  </CustomText>
                </Pressable>
                <Pressable style={styles.statusCard}>
                  <CustomText style={styles.statusText}>
                    🍚 식사 중
                  </CustomText>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.customStatusSection}>
            <CustomText variant='body2' style={styles.customLabel}>
              야외
            </CustomText>
            <Pressable style={[styles.statusCard, styles.selectedStatus]}>
              <CustomText style={styles.statusText}>🚌 외출 중</CustomText>
            </Pressable>
          </View>
        </View>

        {/* 언제 상태를 지울까요? */}
        <View style={styles.section}>
          <CustomText variant='body1' style={styles.sectionTitle}>
            언제 상태를 지울까요?
          </CustomText>

          <View style={styles.timeGrid}>
            <View style={styles.timeRow}>
              <Pressable style={styles.timeCard}>
                <CustomText style={styles.timeText}>계속 유지</CustomText>
              </Pressable>
              <Pressable style={[styles.timeCard, styles.selectedTime]}>
                <CustomText
                  style={[styles.timeText, styles.selectedTimeText]}
                >
                  30분 후
                </CustomText>
              </Pressable>
            </View>
            <View style={styles.timeRow}>
              <Pressable style={styles.timeCard}>
                <CustomText style={styles.timeText}>1시간 후</CustomText>
              </Pressable>
              <Pressable style={styles.timeCard}>
                <CustomText style={styles.timeText}>4시간 후</CustomText>
              </Pressable>
            </View>
            <View style={styles.timeRow}>
              <Pressable style={styles.timeCard}>
                <CustomText style={styles.timeText}>8시간 후</CustomText>
              </Pressable>
              <Pressable 
                style={[
                  styles.timeCard,
                  selectedCustomTime && styles.selectedTime
                ]} 
                onPress={onCustomTimePress}
              >
                <CustomText 
                  style={[
                    styles.timeText,
                    selectedCustomTime && styles.selectedTimeText
                  ]}
                >
                  {getCustomTimeText()}
                </CustomText>
              </Pressable>
            </View>
          </View>
        </View>

      </BottomSheetView>
    </BottomSheetModal>
  );
});

StatusSettingModal.displayName = 'StatusSettingModal';

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  background: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 12,
    marginTop: 0,
  },
  closeIcon: {
    padding: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: GreyColors.grey700,
    fontWeight: '500',
  },
  saveButton: {
    marginRight: -8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: '#227FEB',
    fontWeight: '700',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 16,
    color: GreyColors.grey800,
  },
  statusGrid: {
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 17,
  },
  statusCard: {
    flex: 1,
    padding: 16,
    backgroundColor: GreyColors.grey100,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedStatus: {
    backgroundColor: PrimaryColors.blue100,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  customStatusSection: {
    marginTop: 20,
  },
  customLabel: {
    color: GreyColors.grey500,
    marginBottom: 4,
    fontWeight: '500',
  },
  timeGrid: {
    gap: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 17,
  },
  timeCard: {
    flex: 1,
    padding: 16,
    backgroundColor: GreyColors.grey100,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: PrimaryColors.blue100,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: GreyColors.grey700,
  },
  selectedTimeText: {
    color: 'white',
  },
});