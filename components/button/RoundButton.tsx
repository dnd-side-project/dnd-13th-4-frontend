import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
};

const RoundButton = ({ text, active = false, onPress }: Props) => {
  return (
    <Pressable
      style={[styles.button, active ? styles.active : styles.unActive]}
      onPress={onPress}
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

export default RoundButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 999,
  },
  active: {
    fontWeight: 700, // TODO : weight적용이 안됨.
    backgroundColor: PrimaryColors.blue300,
    borderColor: PrimaryColors.blue100,
  },
  unActive: {
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: GreyColors.grey100,
  },
});
