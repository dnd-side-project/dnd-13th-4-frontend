import { Text, View } from 'react-native';

// 이 페이지는 직접 접근되지 않습니다.
// + 버튼을 눌렀을 때 tabBarButton에서 CreateMindLetter로 리다이렉트됩니다.
export default function MindLetter() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>이 페이지는 표시되지 않습니다</Text>
    </View>
  );
}