import { GreyColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  leftText: string;
  rightText: string;
  style?: StyleProp<ViewStyle>;
};

const StatChip = ({ leftText, rightText, style }: Props) => {
  return (
    <View style={[style, styles.chip]}>
      <CustomText
        variant='body3'
        color={GreyColors.grey500}
        style={styles.left}
      >
        {leftText}
      </CustomText>
      <CustomText
        variant='body3'
        color={GreyColors.grey800}
        style={styles.right}
      >
        {rightText}
      </CustomText>
    </View>
  );
};

export default StatChip;

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    gap: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  left: {},
  right: {
    fontFamily: 'Pretendard-Bold',
  },
});
