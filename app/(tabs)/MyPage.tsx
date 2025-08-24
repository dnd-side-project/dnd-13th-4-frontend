import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

export default function MyPage() {
  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <CustomText>마이페이지</CustomText>
        </View>
      }
      background={{
        type: 'gradient',
        colors: [PrimaryColors.blue300, '#ffffff'],
      }}
    >
      <View>
        <View>
          <CustomText>이미지</CustomText>
          <CustomText>고지우</CustomText>
        </View>
        <View>
          <View>
            <CustomText>룸메이트 정보</CustomText>
          </View>
        </View>
      </View>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: { alignSelf: 'center', paddingVertical: 16 },
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
