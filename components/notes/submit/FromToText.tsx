import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

const FromToText = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>예림님의 마음,</CustomText>
      <CustomText style={styles.text}>지우님에게 잘 전달할게요</CustomText>
    </View>
  );
};

export default FromToText;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  text: {
    fontSize: 23,
    fontFamily: 'Pretendard-Bold',
    color: GreyColors.grey900,
    lineHeight: 32.2,
  },
  name: { fontFamily: 'Pretendard-Bold' },
});
