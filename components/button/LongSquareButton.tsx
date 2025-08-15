import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const LongSquareButton = ({ text, active, onPress, style }: Props) => {
  return (
    <Pressable
      style={[style, styles.button, active ? styles.active : styles.unActive]}
      onPress={onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active }}
    >
      <CustomText
        variant='body2'
        color={active ? PrimaryColors.blue100 : GreyColors.grey800}
      >
        {text}
      </CustomText>
    </Pressable>
  );
};

export default LongSquareButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 12,
  },
  active: {
    fontFamily: 'Pretendard-Bold',
    backgroundColor: PrimaryColors.blue300,
    borderColor: PrimaryColors.blue100,
  },
  unActive: {
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: GreyColors.grey100,
  },
});
