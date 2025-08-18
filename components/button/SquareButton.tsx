import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const SquareButton = ({ active = false, text, onPress, style }: Props) => {
  return (
    <Pressable
      style={[style, styles.button, active ? styles.active : styles.unActive]}
      onPress={onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active }}
    >
      <CustomText
        variant='body2'
        fontWeight={active ? 'bold' : 'medium'}
        color={active ? PrimaryColors.blue100 : GreyColors.grey800}
      >
        {text}
      </CustomText>
    </Pressable>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
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
