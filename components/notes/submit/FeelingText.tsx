import { CustomText } from '@/components/CustomText';
import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

type Props = {
  text: string;
};

const FeelingText = ({ text }: Props) => {
  return (
    <View style={styles.feelingContainer}>
      <CustomText style={styles.feelingText}>
        <CustomText style={styles.feeling}>{text}</CustomText> 마음을 전해요
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
  feelingText: { fontSize: 17 },
  feeling: {
    fontSize: 17,
    color: PrimaryColors.blueText,
    fontFamily: 'Pretendard-Bold',
  },
});
