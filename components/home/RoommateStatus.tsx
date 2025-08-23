import { CustomText } from '@/components/CustomText';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

export const RoommateStatus = () => (
  <View style={styles.container}>
    <CustomText variant='body3' color={GreyColors.grey600}>
      룸메는 지금
    </CustomText>
    <View style={styles.roommateState}>
      <CustomText variant='body1' color={GreyColors.grey800} fontWeight='bold'>
        💻 작업 중
      </CustomText>
      <CustomText
        variant='body3'
        style={styles.roommateTimeInfo}
        color={PrimaryColors.blue100}
      >
        ~18:00
      </CustomText>
      <View style={styles.divideCircle} />
      <CustomText
        variant='body3'
        fontWeight='medium'
        color={GreyColors.grey500}
      >
        주의 부탁해요!
      </CustomText>
    </View>
  </View>
);

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
});
