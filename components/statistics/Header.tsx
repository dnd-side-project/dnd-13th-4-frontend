import { GreyColors } from '@/constants/Colors';
import { LAYOUT_HEADER_HEIGHT } from '@/constants/layout';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

export default function Header() {
  return (
    <View style={styles.headerWrapper}>
      <CustomText variant='body1' color={GreyColors.grey700}>
        마음 리포트
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: LAYOUT_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
