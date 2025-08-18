import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

type Props = {
  leftText: string;
  rightText: string;
};

const NoteCreateGuide = ({ leftText, rightText }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText variant='body1' fontWeight='bold' color={GreyColors.grey400}>
        {leftText}
      </CustomText>
      <CustomText variant='body1' fontWeight='bold' color={GreyColors.grey800}>
        {rightText}
      </CustomText>
    </View>
  );
};

export default NoteCreateGuide;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});
