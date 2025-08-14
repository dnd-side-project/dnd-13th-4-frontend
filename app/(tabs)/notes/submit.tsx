import CTAButton from '@/components/button/CTAButton';
import { StyleSheet, View } from 'react-native';

const Submit = () => {
  return (
    <View style={styles.container}>
      <CTAButton text='마음쪽지 보내기' active />
    </View>
  );
};

export default Submit;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 16 },
});
