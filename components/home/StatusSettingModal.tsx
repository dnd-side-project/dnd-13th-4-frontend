import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import useStatusListQuery from '@/hooks/api/useStatusListQuery';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import SquareButton from '../button/SquareButton';

const CARD_IN_ROW = 2;

interface UserStatus {
  emoji: string;
  text: string;
  endTime?: Date;
}

interface StatusSettingModalProps {
  onClose: () => void;
  onCustomTimePress: () => void;
  selectedCustomTime: Date | null;
  onSave: (status: UserStatus, statusId: number, endTime?: Date) => void;
  currentStatus: UserStatus;
}

export const StatusSettingModal = forwardRef<
  BottomSheetModal,
  StatusSettingModalProps
>(
  (
    { onClose, onCustomTimePress, selectedCustomTime, onSave, currentStatus },
    ref,
  ) => {
    const screenHeight = Dimensions.get('window').height;
    const snapPoints = [screenHeight - 60];

    // API 데이터
    const { data: statusList, isLoading } = useStatusListQuery();

    // 현재 상태에 맞는 statusId 찾기
    const findCurrentStatusId = () => {
      if (
        !statusList ||
        !currentStatus ||
        !currentStatus.emoji ||
        !currentStatus.text
      )
        return -1;
      const currentStatusItem = statusList.find(
        (item) =>
          item.emoji === currentStatus.emoji &&
          item.text === currentStatus.text,
      );
      return currentStatusItem?.id || -1;
    };

    // 선택된 상태 관리
    const [selectedStatus, setSelectedStatus] =
      useState<UserStatus>(currentStatus);
    const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
    const [selectedTimeOption, setSelectedTimeOption] =
      useState<string | null>(null);

    // statusList가 로드되면 현재 상태에 맞는 selectedStatusId 업데이트
    useEffect(() => {
      if (!statusList || isLoading) {
        return; // 로딩 중이면 아직 설정하지 않음
      }
      
      if (
        currentStatus &&
        currentStatus.emoji &&
        currentStatus.text
      ) {
        const currentStatusItem = statusList.find(
          (item) =>
            item.emoji === currentStatus.emoji &&
            item.text === currentStatus.text,
        );
        setSelectedStatusId(currentStatusItem?.id || null);
      } else {
        setSelectedStatusId(null);
      }
      
      // 시간 옵션은 초기에 선택되지 않은 상태로 유지
    }, [statusList, currentStatus, isLoading]);

    // 선택된 커스텀 시간을 텍스트로 변환
    const getCustomTimeText = () => {
      if (!selectedCustomTime) return '직접 설정';

      const now = new Date();
      const diffInMinutes = Math.round(
        (selectedCustomTime.getTime() - now.getTime()) / (1000 * 60),
      );
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

    // 저장 핸들러
    const handleSave = () => {
      let endTime: Date | undefined;

      if (selectedTimeOption === 'custom' && selectedCustomTime) {
        endTime = selectedCustomTime;
      } else if (selectedTimeOption && selectedTimeOption !== 'keep') {
        const now = new Date();
        const minutes =
          {
            '30min': 30,
            '1hour': 60,
            '4hour': 240,
            '8hour': 480,
          }[selectedTimeOption] || 30;

        endTime = new Date(now.getTime() + minutes * 60 * 1000);
      }

      onSave(selectedStatus, selectedStatusId || -1, endTime);
    };

    // 상태 선택 핸들러
    const handleStatusSelect = (id: number, emoji: string, text: string) => {
      setSelectedStatus({ emoji, text });
      setSelectedStatusId(id);
    };

    // 시간 옵션 선택 핸들러
    const handleTimeSelect = (option: string) => {
      setSelectedTimeOption(option);
    };

    // API 데이터에서 위치별로 상태 필터링
    const homeStatusOptions =
      statusList?.filter((status) => status.location === 'HOME') || [];
    const outdoorStatusOptions =
      statusList?.filter((status) => status.location === 'OUTDOORS') || [];

    // 시간 옵션 데이터
    const timeOptions = [
      { id: 'keep', text: '계속 유지' },
      { id: '30min', text: '30분 후' },
      { id: '1hour', text: '1시간 후' },
      { id: '4hour', text: '4시간 후' },
      { id: '8hour', text: '8시간 후' },
      { id: 'custom', text: getCustomTimeText() },
    ];

    // 백드롭 컴포넌트 렌더 함수
    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[props.style, { backgroundColor: 'rgba(107, 118, 132, 0.50)' }]}
      />
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
            <CustomText
              variant='body1'
              color={GreyColors.grey700}
              fontWeight='medium'
              style={styles.title}
            >
              나의 상태 설정
            </CustomText>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <CustomText
                variant='body1'
                color={PrimaryColors.blueText}
                fontWeight='bold'
              >
                저장
              </CustomText>
            </Pressable>
          </View>

          {/* 지금 어떤 상태인가요? */}
          <View style={styles.section}>
            <CustomText
              variant='body1'
              color={GreyColors.grey800}
              fontWeight='bold'
              style={styles.sectionTitle}
            >
              지금 어떤 상태인가요?
            </CustomText>

            <View style={styles.customStatusSection}>
              <CustomText
                variant='body2'
                color={GreyColors.grey500}
                fontWeight='medium'
                style={styles.customLabel}
              >
                집
              </CustomText>
              <FlatList
                data={homeStatusOptions}
                numColumns={CARD_IN_ROW}
                scrollEnabled={false}
                columnWrapperStyle={styles.statusRow}
                renderItem={({ item }) => (
                  <SquareButton
                    active={selectedStatusId === item.id}
                    onPress={() =>
                      handleStatusSelect(item.id, item.emoji, item.text)
                    }
                    text={`${item.emoji} ${item.text}`}
                    showIcon={false}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <View style={styles.customStatusSection}>
              <CustomText
                variant='body2'
                color={GreyColors.grey500}
                fontWeight='medium'
                style={styles.customLabel}
              >
                야외
              </CustomText>
              <FlatList
                data={outdoorStatusOptions}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.statusRow}
                renderItem={({ item }) => (
                  <SquareButton
                    active={selectedStatusId === item.id}
                    onPress={() =>
                      handleStatusSelect(item.id, item.emoji, item.text)
                    }
                    text={`${item.emoji} ${item.text}`}
                    showIcon={false}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>

          {/* 언제 상태를 지울까요? */}
          <View style={styles.section}>
            <CustomText
              variant='body1'
              color={GreyColors.grey800}
              fontWeight='bold'
              style={styles.sectionTitle}
            >
              언제 상태를 지울까요?
            </CustomText>

            <FlatList
              data={timeOptions}
              numColumns={CARD_IN_ROW}
              scrollEnabled={false}
              columnWrapperStyle={styles.timeRow}
              renderItem={({ item }) => (
                <SquareButton
                  style={styles.timeCard}
                  active={selectedTimeOption === item.id}
                  onPress={() => {
                    handleTimeSelect(item.id);
                    if (item.id === 'custom') {
                      onCustomTimePress();
                    }
                  }}
                  text={item.text}
                  showIcon={false}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

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
  },
  saveButton: {
    marginRight: -8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statusRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 17,
  },
  customStatusSection: {
    marginBottom: 20,
  },
  customLabel: {
    marginBottom: 4,
  },
  timeRow: {
    justifyContent: 'space-between',
    gap: 17,
    marginBottom: 12,
  },
  timeCard: {
    backgroundColor: GreyColors.grey100,
    borderRadius: 12,
  },
});
