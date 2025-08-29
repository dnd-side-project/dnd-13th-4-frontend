import { CustomText } from '@/components/CustomText';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleSheet, View } from 'react-native';
import { useIsMatched } from '../mypage/hooks/useMeQuery';

interface UserStatus {
  emoji: string;
  text: string;
  endTime?: Date;
}

interface MyStatusSectionProps {
  onStatusPress: () => void;
  userStatus: UserStatus;
}

export const MyStatusSection = ({
  onStatusPress,
  userStatus,
}: MyStatusSectionProps) => {
  const isMatched = useIsMatched();

  // 종료 시간 포맷팅
  const formatEndTime = (endTime?: Date) => {
    if (!endTime) return '--:--';
    const hours = endTime.getHours().toString().padStart(2, '0');
    const minutes = endTime.getMinutes().toString().padStart(2, '0');
    return `~${hours}:${minutes}`;
  };

  return (
    <View style={styles.myStatus}>
      {isMatched && userStatus ? (
        <>
          <View style={styles.myStatusText}>
            <CustomText
              variant='body2'
              fontWeight='medium'
              style={{ marginRight: 4 }}
            >
              나의 상태는
            </CustomText>
            <CustomText
              variant='body2'
              fontWeight='bold'
              style={{ marginRight: 8 }}
            >
              {userStatus.emoji} {userStatus.text}
            </CustomText>
            <View
              style={{
                paddingVertical: 1,
                paddingHorizontal: 6,
                borderRadius: 20,
                backgroundColor: '#E5F1FF',
              }}
            >
              <CustomText
                variant='body3'
                fontWeight='bold'
                color={PrimaryColors.blue100}
              >
                {formatEndTime(userStatus.endTime)}
              </CustomText>
            </View>
          </View>
        </>
      ) : (
        <CustomText variant='body2' color={GreyColors.grey600}>
          아직 나의 상태를 설정하지 않았어요
        </CustomText>
      )}
      <Pressable onPress={onStatusPress}>
        <CustomText
          variant='body3'
          fontWeight='medium'
          color={GreyColors.grey500}
          style={{
            textDecorationLine: 'underline',
            paddingVertical: 10,
            paddingHorizontal: 8,
          }}
        >
          나의 상태 설정
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  myStatus: {
    height: 58,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: 'rgba(0, 1, 80, 1)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: 'white',
  },
  myStatusText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
