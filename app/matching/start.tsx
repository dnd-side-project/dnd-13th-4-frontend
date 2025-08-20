import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { GreyColors, SecondaryColors } from '@/constants/Colors';
import { LOGO_URL } from '@/constants/imageUri';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

const Start = () => {
  const router = useRouter();

  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <Image
            source={{ uri: LOGO_URL }}
            style={{ width: 57, height: 24, resizeMode: 'contain' }}
          />
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
          <Pressable
            onPress={() => router.push('/matching/inviter')}
            style={styles.button}
          >
            <View
              style={[
                styles.icon,
                { backgroundColor: 'rgba(255, 172, 158, 0.3)' },
              ]}
            >
              <Icon
                name='messageFill'
                size={30}
                color={SecondaryColors.coral}
              />
            </View>
            <View>
              <CustomText variant='body2' color={GreyColors.grey400}>
                룸메이트와 함께 시작하고 싶다면?
              </CustomText>
              <CustomText
                variant='head3'
                fontWeight='bold'
                color={GreyColors.grey800}
              >
                룸메이트 초대하기
              </CustomText>
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.push('/matching/invitee')}
            style={styles.button}
          >
            <View
              style={[
                styles.icon,
                { backgroundColor: 'rgba(134, 210, 219, 0.3)' },
              ]}
            >
              <Icon name='keyFill' size={30} color={SecondaryColors.mint} />
            </View>
            <View>
              <CustomText variant='body2' color={GreyColors.grey400}>
                룸메이트가 나를 초대했다면?
              </CustomText>
              <CustomText
                variant='head3'
                fontWeight='bold'
                color={GreyColors.grey800}
              >
                초대코드로 참여하기
              </CustomText>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default Start;

const styles = StyleSheet.create({
  header: { alignSelf: 'center', paddingVertical: 16 },
  container: {
    flex: 1,
  },
  top: { gap: 8, paddingTop: 12 },
  middle: { gap: 16, paddingTop: '25%' },
  bottom: {},
  button: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    padding: 24,
    backgroundColor: GreyColors.grey50,
    borderRadius: 16,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
