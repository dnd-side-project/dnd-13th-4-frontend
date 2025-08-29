import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { useMateQuery } from '@/components/mypage/hooks/useMateQuery';
import { useMeQuery } from '@/components/mypage/hooks/useMeQuery';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { getDaysAgo } from '@/lib/time';
import { toast } from '@/store/toast.store';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, View } from 'react-native';

const PROFILE_IMAGE_WIDTH = 120;

export default function MyPage() {
  const handleLogout = (): void => {};

  const handleCopy = async (copyText: string): Promise<void> => {
    await Clipboard.setStringAsync(copyText);
    toast.show('초대코드가 복사되었습니다.');
  };

  const { data } = useMeQuery();
  const { data: mateData } = useMateQuery();

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
          <LinearGradient
            colors={['#7BB8FF', '#1085FF', '#00E4FF']}
            start={{ x: 0.1, y: 0.2 }} // 150deg 비슷하게 맞추기 위해 조정
            end={{ x: 0.9, y: 0.8 }}
            style={styles.profileImageWrapper}
          >
            <Image source={{ uri: data?.image }} style={styles.profileImage} />
          </LinearGradient>
          <CustomText variant='head1'>{data?.name ?? `   `}</CustomText>
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
            <Image
              source={{ uri: mateData?.image }}
              style={styles.roommateImage}
            />

            <CustomText
              style={styles.roommateName}
              variant='body1'
              fontWeight='semibold'
            >
              {mateData?.name ?? `   `}
            </CustomText>
            <CustomText variant='body3' color={GreyColors.grey500}>
              우리가 함께한 지{' '}
              {mateData?.joinedAt ? getDaysAgo(mateData.joinedAt) : ` `}일째
            </CustomText>
          </View>
        </View>
        <View style={styles.infoItemContainer}>
          <View style={styles.infoItem}>
            <CustomText color={GreyColors.grey700}>초대코드 복사</CustomText>
            <Pressable onPress={() => handleCopy('2HUM8G4')}>
              <CustomText
                color={GreyColors.grey400}
                style={{ textDecorationLine: 'underline' }}
              >
                2HUM8G4
              </CustomText>
            </Pressable>
          </View>
        </View>
        <View style={styles.infoItemContainer}>
          <View style={styles.infoItem}>
            <CustomText color={GreyColors.grey700}>버전 정보</CustomText>
            <CustomText color={GreyColors.grey400}>6.19.2</CustomText>
          </View>
        </View>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <CustomText
            style={{ textDecorationLine: 'underline' }}
            color={GreyColors.grey500}
            variant='body3'
          >
            로그아웃
          </CustomText>
        </Pressable>
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
  container: { marginTop: 32, flex: 1 },
  profile: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 32,
  },
  profileImageWrapper: {
    padding: 4, // 👈 원하는 만큼 여백
    borderRadius: 134, // 👈 이미지 반지름보다 조금 크게
  },
  profileImage: {
    width: PROFILE_IMAGE_WIDTH + 3,
    height: PROFILE_IMAGE_WIDTH + 3,
    backgroundColor: '#ffffff',
    padding: 3,
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
    borderRadius: 999,
    marginRight: 12,
    borderWidth: 1,
    borderColor: PrimaryColors.blue100,
  },
  roommateData: { flexDirection: 'row', alignItems: 'center' },
  roommateName: { paddingRight: 8 },
  infoItemContainer: {
    paddingTop: 16,
  },
  infoItem: {
    backgroundColor: GreyColors.grey50,
    borderRadius: 8,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 24,
    marginBottom: 8,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutButton: {
    marginTop: 'auto',
    alignSelf: 'center',
    marginBottom: 26,
  },
});
