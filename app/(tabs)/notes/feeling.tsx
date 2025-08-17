import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import NoteCreateFeelingHeader from '@/components/notes/feeling/NoteCreateFeelingHeader';
import { StyleSheet, Text, View } from 'react-native';

const Feeling = () => {
  return (
    <View style={styles.container}>
      <NoteCreateFeelingHeader />
      <CustomText>감정. 룸메에게 어떤 마음을 전하고 싶나요?</CustomText>
      <Text>캐로셀</Text>
      <View style={styles.buttonContainer}>
        <CTAButton style={{ alignSelf: 'flex-end' }} text='다음' active />
      </View>
    </View>
  );
};

export default Feeling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
});
