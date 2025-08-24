import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

export default function MyPage() {
  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <CustomText>마이페이지</CustomText>
        </View>
      }
      background={{
        type: 'gradient',
        colors: [PrimaryColors.blue300, '#ffffff', '#ffffff'],
      }}
    >
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profileImage} />
          <CustomText variant='head1'>고지우</CustomText>
        </View>
        <View style={styles.roommateDataContainer}>
          <CustomText
            style={styles.roommateDataTitle}
            variant='body2'
            fontWeight='bold'
          >
            룸메이트 정보
          </CustomText>
          <View style={styles.roommateData}>
            <View style={styles.roommateImage} />
            <CustomText
              style={styles.roommateName}
              variant='body1'
              fontWeight='semibold'
            >
              김예림
            </CustomText>
            <CustomText variant='body3' color={GreyColors.grey500}>
              우리가 함께한 지 58일째
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText>초대코드 복사</CustomText>
        </View>
        <View>
          <CustomText>버전 정보</CustomText>
        </View>
      </View>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: { alignSelf: 'center', paddingVertical: 16 },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
  container: { marginTop: 32 },
  profile: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    backgroundColor: PrimaryColors.blue100,
    borderRadius: 999,
  },
  roommateDataContainer: {
    backgroundColor: PrimaryColors.blue300,
    borderRadius: 12,
    padding: 16,
  },
  roommateDataTitle: {
    paddingBottom: 16,
  },
  roommateImage: {
    width: 36,
    height: 36,
    backgroundColor: PrimaryColors.blue100,
    borderRadius: 999,
    marginRight: 12,
  },
  roommateData: { flexDirection: 'row', alignItems: 'center' },
  roommateName: { paddingRight: 8 },
});
