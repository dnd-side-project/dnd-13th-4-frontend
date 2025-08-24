import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { Pressable, StyleSheet, View } from 'react-native';

export default function KakaoLoginButton() {
  return (
    <Pressable style={styles.buttonWrapper}>
      <View style={styles.buttonText}>
        <Icon name='kakaoLogo' />
        <CustomText variant='body1' color='black'>
          카카오 로그인
        </CustomText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#FEE500',
    paddingVertical: 11,
  },
  buttonText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
