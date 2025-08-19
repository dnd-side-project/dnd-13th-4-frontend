import { S3_IMAGE_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FeelingText from './FeelingText';
import PromiseText from './PromiseText';
import RandomMessage from './RandomMessage';
import SituationText from './SituationText';

type NoteCardProps = {
  style?: StyleProp<ViewStyle>;
  cardWidth: number;
  changeCardWidth: (newCardWidth: number) => void;
};

const NoteCard = ({ style, cardWidth, changeCardWidth }: NoteCardProps) => {
  const [height, setHeight] = useState(0);

  // ✅ S3 이미지 URL
  const imageUrl = `${S3_IMAGE_URL}/letter_detail/uncomfortable.png`;

  useEffect(() => {
    if (cardWidth > 0) {
      // S3 이미지는 로컬처럼 Image.resolveAssetSource 사용 불가 → Image.getSize 사용
      Image.getSize(
        imageUrl,
        (imgW, imgH) => {
          setHeight((cardWidth * imgH) / imgW); // ✅ 부모 width 기준 비율 유지
        },
        (error) => {
          console.error('이미지 크기 불러오기 실패:', error);
        },
      );
    }
  }, [cardWidth]);

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => changeCardWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.imageContainer}>
        <Image
          style={[{ height, width: cardWidth }]}
          source={{ uri: imageUrl }}
          resizeMode='contain'
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <FeelingText />
        </View>
        <View style={{ marginBottom: 20 }}>
          <SituationText />
        </View>
        <View style={{ marginBottom: 24 }}>
          <PromiseText />
        </View>
        <View style={{ marginBottom: 24 }}>
          <RandomMessage />
        </View>
      </View>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 38,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
