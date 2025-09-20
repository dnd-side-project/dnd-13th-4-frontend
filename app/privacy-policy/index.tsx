import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Icon name='expandLeft' color={'#000000'} />
          </Pressable>
          <CustomText>개인정보 처리방침</CustomText>
          <View style={{ width: 24 }} />
        </View>
      }
      style={{ marginHorizontal: -20 }}
      background={{ type: 'solid', color: '#ffffff' }}
    >
      <WebView
        source={{
          uri: 'https://scientific-angelfish-5a5.notion.site/26a5c948edf3801bb5e0c0cc083bd627?source=copy_link',
        }}
        style={{ flex: 1 }}
      />
    </SafeScreenLayout>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
