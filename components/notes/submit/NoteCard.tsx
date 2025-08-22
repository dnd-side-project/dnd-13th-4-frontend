import { useNoteCreateStore } from '@/app/store/note-create.store';
import ResponsiveImage from '@/components/Image/ResponsiveImage';
import { PrimaryColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FeelingText from './FeelingText';
import PromiseText from './PromiseText';
import RandomMessage from './RandomMessage';
import SituationText from './SituationText';

// ✅ S3 이미지 URL
const imageUrl =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/letter_detail/uncomfortable.png';

type NoteCardProps = {
  style?: StyleProp<ViewStyle>;
};

const NoteCard = ({ style }: NoteCardProps) => {
  const { emotion, promise, situation1, situation2 } = useNoteCreateStore();

  return (
    <View style={[styles.container]}>
      <View style={[styles.card, style]}>
        <View style={styles.imageContainer}>
          <ResponsiveImage source={{ uri: imageUrl }} width={317} />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ marginTop: 20, marginBottom: 24 }}>
            <FeelingText text={emotion?.text ?? ''} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <SituationText
              topText={situation1?.text ?? ''}
              bottomText={situation2?.text ?? ''}
            />
          </View>
          <View style={{ marginBottom: 24 }}>
            <PromiseText text={promise?.text ?? ''} />
          </View>
          <View style={{ marginBottom: 24 }}>
            <RandomMessage />
          </View>
        </View>
      </View>
      <View style={[styles.backgroundCard]} />
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    width: 317,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  card: { backgroundColor: '#ffffff', borderRadius: 20 },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backgroundCard: {
    position: 'absolute',
    width: 300,
    height: 401,
    borderRadius: 20,
    backgroundColor: PrimaryColors.blue100,
    left: '50%',
    transform: [{ translateX: -150 }, { rotate: '9deg' }],
    top: 7,
    zIndex: 10,
  },
});
