import { PrimaryColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

const TimeChip = ({ text, style }: Props) => {
  return (
    <View style={[style, styles.chip]}>
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
    fontFamily: 'Pretendard-Medium',
  },
});
