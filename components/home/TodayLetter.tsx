import { GreyColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue, Image, StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

interface LetterCardProps {
  url: string;
  endTime: string;
  isRead: boolean;
  index: number;
  // LinearGradient props (optional)
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export default function LetterCard({
  url,
  endTime,
  isRead,
  index,
  colors,
  start,
  end,
}: LetterCardProps) {
  // 공통 스타일
  const cardStyle = [
    styles.cardWrapper,
    isRead && styles.readCard,
    { marginRight: index < 4 ? 12 : 0 },
  ];

  // 공통 내용
  const cardContent = (
    <>
      <Image
        source={{
          uri: 'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/home/disappointed.png',
        }}
        style={styles.backgroundImage}
        resizeMode='cover'
      />
      <CustomText
        variant='body3'
        fontWeight='medium'
        color={GreyColors.grey600}
        style={styles.cardTimeInfo}
      >
        시간 전
      </CustomText>
    </>
  );

  // 조건부 렌더링으로 명확하게 분리
  if (isRead) {
    return <View style={cardStyle}>{cardContent}</View>;
  }

  return (
    <LinearGradient
      colors={colors || ['#5BA4FA', '#45E5DD']} // 기본값 제공
      start={start || { x: 0, y: 0 }}
      end={end || { x: 1, y: 1 }}
      style={cardStyle}
    >
      <View style={styles.contentOverlay}>{cardContent}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: 105,
    height: 130,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readCard: {
    backgroundColor: GreyColors.grey300,
  },
  backgroundImage: {
    position: 'absolute',
    width: 95,
    height: 120,
    borderRadius: 8,
  },
  contentOverlay: {
    position: 'relative',
    width: 99,
    height: 124,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTimeInfo: {
    position: 'absolute',
    bottom: 7,
    textAlign: 'center',
  },
});
