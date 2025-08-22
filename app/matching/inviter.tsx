import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const Inviter = () => {
  const router = useRouter();
  const handleCopy = async (copyText: string): Promise<void> => {
    await Clipboard.setStringAsync(copyText);
  };

  // TODO 연동
  const inviteCode = '2HUM8G4';

  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Icon name='expandLeft' size={24} color={GreyColors.grey600} />
          </Pressable>
        </View>
      }
      background={{ type: 'solid', color: '#FFFFFF' }}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <CustomText variant='head1'>{`룸메이트와 함께\n서비스를 시작해 보세요`}</CustomText>
          <CustomText
            variant='body2'
            color={GreyColors.grey400}
          >{`Wini는 나와 룸메이트 모두 참여해야\n서비스를 시작할 수 있어요`}</CustomText>
        </View>
        <View style={styles.middle}>
          <View style={styles.inviteCodeContainer}>
            <CustomText variant='body2' color={GreyColors.grey400}>
              나의 초대코드
            </CustomText>
            <View style={styles.inviteCode}>
              <CustomText variant='head1'>{inviteCode}</CustomText>
              <Pressable
                onPress={() => handleCopy(inviteCode)}
                style={styles.copy}
              >
                <CustomText
                  style={styles.copyText}
                  variant='body3'
                  fontWeight='semibold'
                  color={PrimaryColors.blue100}
                >
                  복사
                </CustomText>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.ctaContainer}>
          <CTAButton
            onPress={() => router.push('/')}
            text='Wini 미리 체험해보기'
            active
          />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default Inviter;

const styles = StyleSheet.create({
  header: { alignSelf: 'flex-start', padding: 16 },
  container: {
    flex: 1,
  },
  top: { gap: 8, paddingTop: 12 },
  middle: { paddingTop: '33%' },
  inviteCodeContainer: {
    paddingVertical: 24,
    borderRadius: 16,
    backgroundColor: GreyColors.grey50,
    alignItems: 'center',
    gap: 4,
  },
  inviteCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  copy: { backgroundColor: PrimaryColors.blue300, borderRadius: 8 },
  copyText: {
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  ctaContainer: {
    marginTop: 'auto',
    marginBottom: 50,
  },
});
