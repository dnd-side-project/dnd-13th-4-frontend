import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { useMateQuery } from '@/components/mypage/hooks/useMateQuery';
import { useMeQuery } from '@/components/mypage/hooks/useMeQuery';
import { useMyRoomsQuery } from '@/components/mypage/hooks/useMyRoomsQuery';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { getDaysAgo } from '@/lib/time';
import { toast } from '@/store/toast.store';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

const PROFILE_IMAGE_WIDTH = 120;

export default function MyPage() {
  const router = useRouter();
  const handleLogout = (): void => {};

  const handleCopy = async (copyText: string): Promise<void> => {
    await Clipboard.setStringAsync(copyText);
    toast.show('초대코드가 복사되었습니다.');
  };

  const { data } = useMeQuery();
  const { data: mateData } = useMateQuery();
  const { data: { code: roomCode } = { code: `       ` } } = useMyRoomsQuery();

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
            {data?.image ? (
              <Image
                source={{ uri: data?.image }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <Icon name='person' size={48} color={PrimaryColors.blue100} />
              </View>
            )}
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
            {mateData?.image ? (
              <Image
                source={{
                  // TODO 카카오 프사 http:// 로 들어오는경우 있음. http는 실기기에서 로드가되지 않음.
                  uri: mateData?.image?.replace(/^http:\/\//, 'https://'),
                }}
                style={styles.roommateImage}
              />
            ) : (
              <View style={styles.roommateImage}>
                <Icon name='person' size={18} color={'#ffffff'} />
              </View>
            )}

            <CustomText
              style={styles.roommateName}
              variant='body1'
              fontWeight='semibold'
            >
              {mateData?.name ?? `   `}
            </CustomText>
            <CustomText variant='body3' color={GreyColors.grey500}>
              · 우리가 함께한 지{' '}
              {mateData?.joinedAt ? getDaysAgo(mateData.joinedAt) : ` `}일째
            </CustomText>
          </View>
        </View>

        <View style={styles.infoItemContainer}>
          <CustomText
            variant='body1'
            fontWeight='semibold'
            style={styles.infoTitle}
          >
            관리
          </CustomText>
          <View style={styles.infoItem}>
            <CustomText color={GreyColors.grey700}>초대코드 복사</CustomText>
            <Pressable onPress={() => handleCopy(roomCode)}>
              <CustomText
                color={GreyColors.grey400}
                style={{ textDecorationLine: 'underline' }}
              >
                {roomCode}
              </CustomText>
            </Pressable>
          </View>
        </View>
        <View style={styles.infoItemContainer}>
          <CustomText
            variant='body1'
            fontWeight='semibold'
            style={styles.infoTitle}
          >
            고객 센터
          </CustomText>
          <Pressable
            onPress={() => router.push('/terms-of-service')}
            style={styles.infoItem}
          >
            <CustomText color={GreyColors.grey700}>이용 약관</CustomText>
            <Icon name='expandRight' color={GreyColors.grey400} />
          </Pressable>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: PrimaryColors.blue100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roommateData: { flexDirection: 'row', alignItems: 'center' },
  roommateName: { paddingRight: 8 },

  infoItemContainer: {
    paddingTop: 40,
  },
  infoTitle: { paddingBottom: 8 },
  infoItem: {
    backgroundColor: GreyColors.grey50,
    borderRadius: 8,
    paddingVertical: 16,
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
