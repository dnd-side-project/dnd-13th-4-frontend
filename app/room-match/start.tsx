import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { Image, StyleSheet, View } from 'react-native';

const LOGO_URL =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/logo.png';

const Start = () => {
  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <Image
            source={{
              uri: LOGO_URL,
            }}
          />
        </View>
      }
    >
      <CustomText>룸메이트와 함께</CustomText>
    </SafeScreenLayout>
  );
};

export default Start;

const styles = StyleSheet.create({
  header: { justifyContent: 'center' },
});
