import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { FontWeightToFamily } from '@/constants/Typography';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

const Invitee = () => {
  const router = useRouter();

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
          <CustomText variant='head1'>{`룸메이트에게 받은\n초대코드를 입력하세요`}</CustomText>
        </View>
        <View style={styles.middle}>
          <View style={styles.inputContainer}>
            <CustomText variant='body2' color={PrimaryColors.blue100}>
              초대코드
            </CustomText>
            <TextInput
              style={styles.textInput}
              placeholder='초대코드 7자리'
              placeholderTextColor='#ccc'
              maxLength={7}
              keyboardType='numeric'
              clearButtonMode='while-editing' // TODO : iOS에서만 동작
            />
          </View>
        </View>
        <View style={styles.ctaContainer}>
          <CTAButton text='확인' active />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default Invitee;

const styles = StyleSheet.create({
  header: { alignSelf: 'flex-start', padding: 16 },
  container: {
    flex: 1,
  },
  top: { gap: 8, paddingTop: 8 },
  middle: { paddingTop: '33%' },
  inputContainer: {
    borderWidth: 2,
    borderColor: PrimaryColors.blue100,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 4,
  },
  textInput: {
    fontSize: 23,
    fontFamily: FontWeightToFamily.bold,
    padding: 0,
    color: GreyColors.grey800,
  },
  ctaContainer: {
    marginTop: 'auto',
    marginBottom: 50,
  },
});
