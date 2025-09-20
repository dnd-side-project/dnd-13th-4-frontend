import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

type Props = {
  text: string;
};

const FromToText = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText
        variant='head1'
        color={GreyColors.grey800}
        style={styles.text}
      >
        {text}
      </CustomText>
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
    textAlign: 'center',
  },
});
