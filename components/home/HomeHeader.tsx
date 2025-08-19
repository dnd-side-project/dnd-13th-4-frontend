import { LOGO } from '@/constants';
import { Image, StyleSheet, View } from 'react-native';

export const HomeHeader = () => (
  <View style={styles.header}>
    <Image source={{ uri: LOGO }} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 57,
    height: 24,
    resizeMode: 'contain',
  },
});
