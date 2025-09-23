import { CustomText } from '@/components/CustomText';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import useMateStatusQuery from '@/hooks/api/useMateStatusQuery';
import { Image, StyleSheet, View } from 'react-native';
import { useIsMatched } from '../mypage/hooks/useMeQuery';

export const RoommateStatus = () => {
  const { data: mateStatus, isLoading } = useMateStatusQuery();

  const isMatched = useIsMatched();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomText variant='body3' color={GreyColors.grey600}>
          룸메는 지금
        </CustomText>
        <View style={styles.roommateState}>
          <CustomText variant='body1' color={GreyColors.grey500}>
            불러오는 중...
          </CustomText>
        </View>
      </View>
    );
  }

  if (!isMatched) {
    return (
      <View style={[styles.container, styles.unmatchedContainer]}>
        <Image
          source={{ uri: `${S3_IMAGE_URL}/home/loading_mate_status.png` }}
          style={styles.unmatchedImage}
        />
        <CustomText variant='body3' color={GreyColors.grey600}>
          룸메이트의 상태는 여기서 보여드릴게요
        </CustomText>
      </View>
    );
  }

  if (!mateStatus?.text) {
    return (
      <View style={styles.container}>
        <CustomText variant='body3' color={GreyColors.grey600}>
          룸메이트가 아직
        </CustomText>
        <View style={styles.roommateState}>
          <CustomText
            variant='body1'
            fontWeight='bold'
            color={GreyColors.grey600}
          >
            ⚪️ 상태를 설정하지 않았어요
          </CustomText>
        </View>
      </View>
    );
  }

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  const getEndTime = () => {
    if (!mateStatus.statusStartedAt || !mateStatus.reservedTimeInfo) return '';

    const { hour, minute } = mateStatus.reservedTimeInfo;
    if (hour === -1 && minute === -1) return '계속 유지';

    const startDate = new Date(mateStatus.statusStartedAt);
    startDate.setHours(startDate.getHours() + hour);
    startDate.setMinutes(startDate.getMinutes() + minute);

    return `~${formatTime(startDate.toISOString())}`;
  };

  return (
    <View style={styles.container}>
      <CustomText variant='body3' color={GreyColors.grey600}>
        룸메는 지금
      </CustomText>
      <View style={styles.roommateState}>
        <CustomText
          variant='body1'
          color={GreyColors.grey800}
          fontWeight='bold'
        >
          {mateStatus.emoji} {mateStatus.text}
        </CustomText>
        {getEndTime() && (
          <CustomText
            variant='body3'
            style={styles.roommateTimeInfo}
            color={PrimaryColors.blue100}
          >
            {getEndTime()}
          </CustomText>
        )}
        <View style={styles.divideCircle} />
        <CustomText
          variant='body3'
          fontWeight='medium'
          color={GreyColors.grey500}
        >
          {mateStatus.request}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
    marginBottom: 20,
    backgroundColor: GreyColors.grey50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GreyColors.grey100,
  },
  roommateState: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  roommateTimeInfo: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 100,
    backgroundColor: PrimaryColors.blue300,
    marginLeft: 8,
  },
  divideCircle: {
    width: 2,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: GreyColors.grey600,
    marginHorizontal: 4,
  },
  unmatchedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
    gap: 8,
  },
  unmatchedImage: {
    width: 47,
    height: 29,
  },
});
