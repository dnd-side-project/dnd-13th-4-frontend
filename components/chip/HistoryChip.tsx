import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
};

const HistoryChip = ({ text }: Props) => {
  return (
    <View style={styles.chip}>
      <CustomText variant='body3' color={PrimaryColors.blue100}>
        {text}
      </CustomText>
    </View>
  );
};

export default HistoryChip;

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: PrimaryColors.blue300,
    borderRadius: 8,
  },
});
