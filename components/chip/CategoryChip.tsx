import { GreyColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';

type Props = {
  selected?: boolean;
  text: string;
  style?: StyleProp<ViewStyle>;
};

const CategoryChip = ({ selected = false, text, style }: Props) => {
  return (
    <View
      style={[
        style,
        styles.chip,
        selected ? styles.selected : styles.unSelected,
      ]}
    >
      <CustomText
        color={selected ? '#ffffff' : GreyColors.grey600}
        variant='body2'
      >
        {text}
      </CustomText>
    </View>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  chip: {
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: GreyColors.grey800,
    borderColor: GreyColors.grey800,
  },
  unSelected: { borderWidth: 1, borderColor: GreyColors.grey300 },
});
