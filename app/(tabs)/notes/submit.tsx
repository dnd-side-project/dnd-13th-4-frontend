import CTAButton from '@/components/button/CTAButton';
import FromToText from '@/components/notes/submit/FromToText';
import NoteCard from '@/components/notes/submit/NoteCard';
import { StyleSheet, View } from 'react-native';

const Submit = () => {
  return (
    <View style={styles.container}>
      <FromToText />
      <NoteCard />
      <CTAButton text='마음쪽지 보내기' active />
    </View>
  );
};

export default Submit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
});
