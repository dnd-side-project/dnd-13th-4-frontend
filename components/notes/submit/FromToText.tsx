import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

const FromToText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <CustomText>
          <CustomText style={styles.name}>예림</CustomText>님의 마음,
        </CustomText>
        <CustomText>
          <CustomText style={styles.name}>지우</CustomText>님에게 잘 전달할게요
        </CustomText>
      </View>
    </View>
  );
};

export default FromToText;

const styles = StyleSheet.create({
  container: { paddingTop: 24, paddingBottom: 16 },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 23,
    color: GreyColors.grey900,
  },
  name: { fontFamily: 'Pretendard-Bold' },
});
