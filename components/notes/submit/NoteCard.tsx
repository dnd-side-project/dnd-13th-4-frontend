import { CustomText } from '@/components/CustomText';
import { PrimaryColors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

const NoteCard = () => {
  const [height, setHeight] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const source = require('@/assets/images/불편함_카드.png');

  useEffect(() => {
    if (cardWidth > 0 && Platform.OS !== 'web') {
      const { width: imgW, height: imgH } = Image.resolveAssetSource(source);
      setHeight((cardWidth * imgH) / imgW); // ✅ 부모 실제 width 기반 비율 계산
    }
  }, [cardWidth, source]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.imageContainer}>
        <Image style={[styles.image, { height }]} source={source} />
      </View>
      <View style={styles.feelingContainer}>
        <CustomText style={styles.feelingText}>
          <CustomText style={styles.feeling}>불편했던</CustomText> 마음을 전해요
        </CustomText>
      </View>
      <View style={styles.situationContainer}>
        <View style={styles.badge}>
          <CustomText style={styles.badgeText}>상황</CustomText>
        </View>
        <View>
          <CustomText>룸메님이 큰소리로 노래했어요</CustomText>
          <CustomText>그때 저는 중요한 업무중이었어요</CustomText>
        </View>
      </View>
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
  situationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  promiseContainer: {
    display: 'flex',
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
