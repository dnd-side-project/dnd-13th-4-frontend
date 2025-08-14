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
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
