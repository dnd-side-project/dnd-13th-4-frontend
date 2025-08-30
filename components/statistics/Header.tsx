import { GreyColors } from '@/constants/Colors';
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
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
