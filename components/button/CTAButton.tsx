import { PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
};

const CTAButton = ({ text, active, onPress }: Props) => {
  return (
    <Pressable
      style={[styles.button, active ? styles.active : styles.unActive]}
      onPress={onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active }}
    >
      <CustomText
        style={[active ? styles.active : styles.unActive]}
        color={active ? '#ffffff' : PrimaryColors.blue100}
      >
        {text}
      </CustomText>
    </Pressable>
  );
};

export default CTAButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
  },
  active: {
    fontFamily: 'Pretendard-Bold',
    backgroundColor: PrimaryColors.blue100,
  },
  unActive: {
    borderColor: PrimaryColors.blue100,
    backgroundColor: '#ffffff',
  },
});
