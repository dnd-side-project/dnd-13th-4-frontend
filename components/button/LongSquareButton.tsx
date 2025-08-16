import { GreyColors, PrimaryColors } from '@/constants/Colors';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { CustomText } from '../CustomText';
import { Icon } from '../icons';

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
      <View style={{ width: 24 }} />
      <CustomText
        variant='body2'
        style={[styles.text, active ? styles.active : styles.unActive]}
        color={active ? PrimaryColors.blue100 : GreyColors.grey800}
      >
        {text}
      </CustomText>
      <Icon
        name='checkFill'
        size={24}
        color={active ? PrimaryColors.blue100 : '#CCD2E3'}
      />
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  text: {
    alignSelf: 'center',
  },
});
