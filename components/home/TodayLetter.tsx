import { GreyColors } from '@/constants/Colors';
import { CARD_HEIGHT, CARD_WIDTH } from '@/constants/cardSize';
import { formatDaysAgo } from '@/lib/time';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

interface LetterCardProps {
  url: string;
  createdAt: string;
  isRead: boolean;
}

export default function LetterCard({
  url,
  createdAt,
  isRead,
}: LetterCardProps) {
  // 공통 스타일
  const cardStyle = [styles.cardWrapper, isRead && styles.readCard];

  // 공통 내용
  const cardContent = (
    <>
      <Image
        source={{
          uri: url,
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
        {formatDaysAgo(createdAt)}
      </CustomText>
    </>
  );

  // 조건부 렌더링으로 명확하게 분리
  if (isRead) {
    return <View style={cardStyle}>{cardContent}</View>;
  }

  return (
    <LinearGradient
      colors={
        isRead
          ? [GreyColors.grey300, GreyColors.grey300]
          : ['#5BA4FA', '#45E5DD', '#5BA4FA']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={cardStyle}
    >
      <View style={styles.contentOverlay}>{cardContent}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readCard: {
    backgroundColor: GreyColors.grey300,
  },
  backgroundImage: {
    position: 'absolute',
    width: CARD_WIDTH - 6,
    height: CARD_HEIGHT - 6,
    borderRadius: 9,
  },
  contentOverlay: {
    position: 'relative',
    width: CARD_WIDTH - 6,
    height: CARD_HEIGHT - 6,
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
