import { GreyColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';

interface LetterCardProps {
  url: string;
  createdAt: string;
  isRead: boolean;
  index: number;
}

// 카드 비율 (105:130)과 화면 기반 크기 계산
const CARD_ASPECT_RATIO = 105 / 130;
const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 48; // 양쪽 24px씩
const GAP_TOTAL = 24; // 12px * 2 (간격)
const MAX_CARDS = 3;
const AVAILABLE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING - GAP_TOTAL;
const CARD_WIDTH = AVAILABLE_WIDTH / MAX_CARDS;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export default function LetterCard({
  url,
  createdAt,
  isRead,
  index,
}: LetterCardProps) {
  // 시간 차이 계산 함수
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now.getTime() - created.getTime();
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return '방금 전';
    }
  };

  // 공통 스타일
  const cardStyle = [
    styles.cardWrapper,
    isRead && styles.readCard,
  ];

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
        {getTimeAgo(createdAt)}
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
          ? ['#5BA4FA', '#45E5DD', '#5BA4FA']
          : [GreyColors.grey300, GreyColors.grey300]
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
