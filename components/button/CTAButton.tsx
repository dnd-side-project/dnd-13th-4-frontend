import { PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const CTAButton = ({ text, active, onPress, style }: Props) => {
  return (
    <Pressable
      style={[style, styles.button, active ? styles.active : styles.unActive]}
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
