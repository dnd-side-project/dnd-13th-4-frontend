import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <SafeScreenLayout>
      <Text style={styles.title}>홈</Text>
      <View style={styles.contentArea}>
        <Text style={styles.content}>메인 콘텐츠 영역</Text>
      </View>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
  contentArea: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Pretendard',
    color: '#333',
  },
});
