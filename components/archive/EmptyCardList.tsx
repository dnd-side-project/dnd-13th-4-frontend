import { GreyColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';
import SvgEmptyList from './SvgEmptyList';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const EmptyCardList = ({ style }: Props) => {
  return (
    <View style={[style, styles.container]}>
      <View style={styles.center}>
        <View style={styles.image}>
          <SvgEmptyList />
        </View>
        <CustomText
          style={styles.title}
          variant='body2'
          color={GreyColors.grey600}
        >
          아직 모아둔 마음쪽지가 없어요
        </CustomText>
        <CustomText
          style={styles.description}
          variant='body3'
          color={GreyColors.grey500}
        >
          {`룸메이트에게 받은 마음쪽지를 보관해서\n기억하고 싶은 마음을 간직해보세요`}
        </CustomText>
      </View>
    </View>
  );
};

export default EmptyCardList;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { width: 230 },
  image: { paddingBottom: '15%' },
  title: { textAlign: 'center', paddingBottom: 8 },
  description: { textAlign: 'center' },
});
