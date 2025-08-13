import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  selected?: boolean;
};

const RoundButton = ({ text, selected = false }: Props) => {
  return (
    <View
      style={[styles.button, selected ? styles.selected : styles.unSelected]}
    >
      <CustomText
        variant='body2'
        color={selected ? PrimaryColors.blue100 : GreyColors.grey800}
      >
        {text}
      </CustomText>
    </View>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 30,
  },
  selected: {
    fontWeight: 700, // TODO : weight적용이 안됨.
    backgroundColor: PrimaryColors.blue300,
    borderColor: PrimaryColors.blue100,
  },
  unSelected: {
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: GreyColors.grey100,
  },
});
