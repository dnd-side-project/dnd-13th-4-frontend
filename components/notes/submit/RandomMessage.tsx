import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

const RandomMessage = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>
        지금처럼만 하면 우리 룸메 계약 연장 가능✨
      </CustomText>
      <View style={styles.icon}>
        <Icon name='refresh' color={GreyColors.grey500} />
      </View>
    </View>
  );
};

export default RandomMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingVertical: 6,
    fontSize: 13,
    color: GreyColors.grey500,
    lineHeight: 19.5,
  },
  icon: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
