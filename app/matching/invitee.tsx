import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { useRoomJoinMutation } from '@/components/matching/hooks/useRoomJoinMutation';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { FontWeightToFamily } from '@/constants/Typography';
import { toast } from '@/store/toast.store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

const INVITE_CODE_LENGTH = 7;

const Invitee = () => {
  const router = useRouter();
  const { mutateAsync } = useRoomJoinMutation();
  const [inviteCode, setInviteCode] = useState('');

  const handleConfirm = async (): Promise<void> => {
    try {
      await mutateAsync({ roomCode: inviteCode });
      router.push('/');
    } catch (e) {
      toast.show('초대코드가 일치하지않아요.');
    }
  };

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
              onChangeText={(text) => setInviteCode(text.toUpperCase())}
              value={inviteCode}
              style={styles.textInput}
              placeholder='초대코드 7자리'
              placeholderTextColor={GreyColors.grey300}
              maxLength={7}
              keyboardType='default'
              autoCapitalize='characters'
              clearButtonMode='while-editing' // TODO : iOS에서만 동작
            />
          </View>
        </View>
        <View style={styles.ctaContainer}>
          <CTAButton
            onPress={handleConfirm}
            text='확인'
            active={inviteCode.length === INVITE_CODE_LENGTH}
          />
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
  top: { gap: 8, paddingTop: 12 },
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
