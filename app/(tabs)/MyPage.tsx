import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { modal } from '@/components/modal/modal';
import { useDeleteAccountMutation } from '@/components/mypage/hooks/useDeleteAccountMutation';
import { useMateQuery } from '@/components/mypage/hooks/useMateQuery';
import { useMeQuery } from '@/components/mypage/hooks/useMeQuery';
import { useMyRoomsQuery } from '@/components/mypage/hooks/useMyRoomsQuery';
import { getMailDeviceInfo } from '@/components/mypage/modules/getMailDeviceInfo';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { tokenStorage } from '@/lib/auth/tokenStorage';
import { getDaysAgo } from '@/lib/time';
import { logout } from '@/services/authService';
import { toast } from '@/store/toast.store';
import { openMail } from '@/utils/openMail';
import * as Application from 'expo-application';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

const PROFILE_IMAGE_WIDTH = 120;

export default function MyPage() {
  const router = useRouter();
  const { mutateAsync: mutateAsyncDeleteAccount } = useDeleteAccountMutation();

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
          <CustomText color={GreyColors.grey700}>마이페이지</CustomText>
        </View>
      }
      background={{
        type: 'gradient',
        colors: [PrimaryColors.blue300, '#ffffff', '#ffffff'],
      }}
    >
      <ScrollView style={styles.container}>
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
          <Pressable
            onPress={() => router.push('/privacy-policy')}
            style={styles.infoItem}
          >
            <CustomText color={GreyColors.grey700}>
              개인정보 처리방침
            </CustomText>
            <Icon name='expandRight' color={GreyColors.grey400} />
          </Pressable>
          <Pressable
            onPress={async () => {
              if (!data) return;

              try {
                await openMail({
                  recipients: ['dnd13gi4jo@gmail.com'],
                  subject: '위니 문의하기',
                  body: getMailDeviceInfo({ userId: data.id }),
                });
              } catch (e) {
                toast.show('메일을 열 수 없습니다.');
              }
            }}
            style={styles.infoItem}
          >
            <CustomText color={GreyColors.grey700}>문의하기</CustomText>
            <Icon name='expandRight' color={GreyColors.grey400} />
          </Pressable>
        </View>
        <View style={styles.infoItemContainer}>
          <CustomText
            variant='body1'
            fontWeight='semibold'
            style={styles.infoTitle}
          >
            기타
          </CustomText>
          <Pressable
            onPress={async () => {
              await logout();
              router.replace('/onboarding');
            }}
            style={styles.infoItem}
          >
            <CustomText color={GreyColors.grey700}>로그아웃</CustomText>
            <Icon name='expandRight' color={GreyColors.grey400} />
          </Pressable>
          <Pressable
            onPress={async () => {
              modal.show({
                title: '정말 탈퇴하시겠습니까?',
                description: `지금 탈퇴하면 룸메이트와 주고받은 마음쪽지를 다시 볼 수 없어요.\n그래도 탈퇴하시겠어요?`,
                confirmText: '확인',
                onConfirm: async () => {
                  await mutateAsyncDeleteAccount();
                  router.replace('/onboarding');
                },
                cancelText: '취소',
              });
            }}
            style={styles.infoItem}
          >
            <CustomText color={GreyColors.grey700}>탈퇴하기</CustomText>
            <Icon name='expandRight' color={GreyColors.grey400} />
          </Pressable>
        </View>
        <View style={styles.bottomContainer}>
          <CustomText color={GreyColors.grey400} variant='body3'>
            {`앱 버전   ${Application.nativeApplicationVersion}`}
          </CustomText>
        </View>
      </ScrollView>
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
  container: { paddingTop: 32, flex: 1 },
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
  roommateData: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  roommateName: { paddingRight: 8 },

  infoItemContainer: {
    paddingTop: 32,
  },
  infoTitle: { paddingBottom: 8 },
  infoItem: {
    backgroundColor: GreyColors.grey50,
    borderRadius: 8,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 24,
    marginBottom: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 26,
  },
});
