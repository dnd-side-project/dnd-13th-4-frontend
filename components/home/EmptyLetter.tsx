import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
import { CARD_WIDTH, CARD_HEIGHT } from '@/constants/cardSize';
import { Image, StyleSheet, View } from 'react-native';


export default function EmptyTodayLetter() {
  return (
    <View style={styles.letterConatiner}>
      <Image
        style={styles.letterImage}
        source={{ uri: `${S3_IMAGE_URL}/home/empty_notes.png` }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  letterConatiner: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: GreyColors.grey300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  letterImage: {
    width: Math.min(80, CARD_WIDTH * 0.76), // 카드 크기에 비례해서 조정
    aspectRatio: 1,
  },
});
