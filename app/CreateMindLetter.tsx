import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { StyleSheet, Text, View } from 'react-native';

export default function CreateMindLetter() {
  return (
    <SafeScreenLayout>
      <Text style={styles.title}>톰메이트와 부담없이</Text>
      <Text style={styles.subtitle}>감정을 나눠보세요</Text>

      <View style={styles.inputArea}>
        <Text>여기에 입력 필드가 들어갑니다</Text>
      </View>

      <View style={styles.buttonArea}>
        <Text>다지털 우산 보내기</Text>
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
  subtitle: {
    fontSize: 16,
    fontFamily: 'Pretendard',
    color: '#666',
    marginTop: 8,
  },
  inputArea: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    minHeight: 200,
  },
  buttonArea: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
