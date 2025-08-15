import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { StyleSheet, Text, View } from 'react-native';

export default function Storage() {
  return (
    <SafeScreenLayout edges={['top', 'left', 'right']}>
      <Text style={styles.title}>보관함</Text>
      <View style={styles.contentArea}>
        <Text style={styles.content}>저장된 콘텐츠들</Text>
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
