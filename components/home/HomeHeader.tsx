import { Image, StyleSheet, View } from 'react-native';

const LOGO =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/logo.png';

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