import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
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
    width: 105,
    height: 130,
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
    width: 80,
    aspectRatio: 1,
  },
});
