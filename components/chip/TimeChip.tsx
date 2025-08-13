import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
};

const TimeChip = ({ text }: Props) => {
  return (
    <View style={styles.chip}>
      <CustomText variant='body3' color={PrimaryColors.blue100}>
        {text}
      </CustomText>
    </View>
  );
};

export default TimeChip;

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: PrimaryColors.blue300,
    paddingHorizontal: 6,
    fontWeight: 500,
  },
});
