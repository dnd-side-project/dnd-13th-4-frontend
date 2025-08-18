import { PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const CTAButton = ({
  text,
  active,
  onPress,
  style,
  disabled = false,
}: Props) => {
  return (
    <Pressable
      style={[
        style,
        styles.button,
        active ? styles.active : styles.unActive,
        disabled ? styles.disabled : null,
      ]}
      onPress={disabled ? undefined : onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active, disabled }}
    >
      <CustomText
        style={[styles.text, active ? styles.active : styles.unActive]}
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
    borderColor: PrimaryColors.blue100,
  },
  text: {
    fontSize: 17,
    lineHeight: 17,
  },
  active: {
    fontFamily: 'Pretendard-Bold',
    backgroundColor: PrimaryColors.blue100,
  },
  unActive: {
    backgroundColor: '#ffffff',
  },
  disabled: {
    opacity: 0.5,
  },
});
