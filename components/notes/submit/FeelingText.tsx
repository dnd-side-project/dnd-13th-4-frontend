import { CustomText } from '@/components/CustomText';
import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

type Props = {
  text: string;
};

const FeelingText = ({ text }: Props) => {
  return (
    <View style={styles.feelingContainer}>
      <CustomText variant='body3'>
        <CustomText
          variant='body3'
          fontWeight='bold'
          color={PrimaryColors.blueText}
        >
          {text}
        </CustomText>{' '}
        마음을 전해요
      </CustomText>
    </View>
  );
};

export default FeelingText;

const styles = StyleSheet.create({
  feelingContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: PrimaryColors.blue200,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
