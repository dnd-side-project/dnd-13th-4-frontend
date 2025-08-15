import CTAButton from '@/components/button/CTAButton';
import FromToText from '@/components/notes/submit/FromToText';
import NoteCard from '@/components/notes/submit/NoteCard';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Submit = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/note-submit-bg.png')} // TODO : 개발환경에서 깜빡임 발생함. 최적화 필요함.
      style={styles.container}
    >
      <View style={{ paddingTop: 24, paddingBottom: 40 }}>
        <FromToText />
      </View>
      <View>
        <NoteCard />
      </View>
      <CTAButton text='마음쪽지 보내기' active />
    </ImageBackground>
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
