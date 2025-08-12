import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { StyleSheet, Text, View } from 'react-native';

export default function Statistics() {
  return (
    <SafeScreenLayout edges={['top', 'left', 'right']}>
      <Text style={styles.title}>통계</Text>
      <View style={styles.contentArea}>
        <Text style={styles.content}>통계 데이터</Text>
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
