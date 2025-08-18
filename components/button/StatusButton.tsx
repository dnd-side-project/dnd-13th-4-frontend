import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const StatusButton = ({ text, active, onPress, style }: Props) => {
  return (
    <Pressable
      style={[style, styles.button, active ? styles.active : styles.unActive]}
      onPress={onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active }}
    >
      <CustomText
        style={active ? styles.active : styles.unActive}
        color={active ? PrimaryColors.blue100 : '#333D4B'}
      >
        {text}
      </CustomText>
    </Pressable>
  );
};

export default StatusButton;

const styles = StyleSheet.create({
  button: {
    width: 168,
    alignSelf: 'flex-start',
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  active: {
    fontFamily: 'Pretendard-Bold',
    backgroundColor: PrimaryColors.blue300,
    borderColor: PrimaryColors.blue100,
    color: PrimaryColors.blue100,
  },
  unActive: {
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: GreyColors.grey100,
  },
});
