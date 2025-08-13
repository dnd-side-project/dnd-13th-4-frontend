import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  active?: boolean;
};

const CTAButton = ({ text, active }: Props) => {
  return (
    <View style={[styles.button, active ? styles.active : styles.unActive]}>
      <CustomText
        variant='body1'
        color={active ? '#ffffff' : GreyColors.grey600}
      >
        {text}
      </CustomText>
    </View>
  );
};

export default CTAButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  active: {
    fontWeight: 700, // TODO : weight적용이 안됨.
    backgroundColor: PrimaryColors.blue100,
  },
  unActive: {
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: GreyColors.grey200,
  },
});
