import { CustomText } from '@/components/CustomText';
import { PrimaryColors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SituationText from './SituationText';

const NoteCard = () => {
  const [height, setHeight] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  // ✅ S3 이미지 URL
  const imageUrl =
    'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/letter_detail/uncomfortable.png';

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
  }, [cardWidth, imageUrl]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.imageContainer}>
        <Image
          style={[{ height, width: cardWidth }]}
          source={{ uri: imageUrl }}
          resizeMode='contain'
        />
      </View>

      <View style={styles.feelingContainer}>
        <CustomText style={styles.feelingText}>
          <CustomText style={styles.feeling}>불편했던</CustomText> 마음을 전해요
        </CustomText>
      </View>

      <SituationText />

      <View style={styles.promiseContainer}>
        <View style={styles.badge}>
          <CustomText style={styles.badgeText}>약속</CustomText>
        </View>
        <View>
          <CustomText>배려해주면 집이 더 따뜻해질 거에요👍</CustomText>
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
  feelingContainer: {
    marginTop: 20,
    marginBottom: 24,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: PrimaryColors.blue200,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  feelingText: { fontSize: 17 },
  feeling: {
    fontSize: 17,
    color: PrimaryColors.blueText,
    fontFamily: 'Pretendard-Bold',
  },
  promiseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: PrimaryColors.blue300,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    color: PrimaryColors.blue100,
    fontFamily: 'Pretendard-SemiBold',
  },
});
