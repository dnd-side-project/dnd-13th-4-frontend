import { CustomText } from '@/components/CustomText';
import DashedBottomLine from '@/components/DashedBottomLine';
import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import NoteBadge from './NoteBadge';

type Props = {
  text: string;
};

const PromiseText = ({ text }: Props) => {
  return (
    <View style={styles.promiseContainer}>
      <View style={{ paddingRight: 11 }}>
        <NoteBadge text='약속' />
      </View>
      <View>
        <CustomText
          style={{ fontFamily: 'Pretendard-Bold' }}
          variant='body2'
          color={PrimaryColors.blueText}
        >
          {text}
        </CustomText>
        <DashedBottomLine />
      </View>
    </View>
  );
};

export default PromiseText;

const styles = StyleSheet.create({
  promiseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
