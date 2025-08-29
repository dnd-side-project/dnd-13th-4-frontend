import { CustomText } from '@/components/CustomText';
import ResponsiveImage from '@/components/Image/ResponsiveImage';
import { PrimaryColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { EmotionType } from '../hooks/useClosingTemplatesQuery';
import FeelingText from './FeelingText';
import PromiseText from './PromiseText';
import RandomMessage from './RandomMessage';
import SituationText from './SituationText';

type NoteCardProps = {
  style?: StyleProp<ViewStyle>;
  date: string;
  imageUrl: string;
  emotionText: string;
  promiseText: string;
  situationActionText: string;
  situationStateText?: string;
  isRandomMessage?: boolean;
  randomMessage?: string;
  emotionType: EmotionType;
  isRefresh?: boolean;
};

const NoteCard = ({
  style,
  date,
  emotionText,
  imageUrl,
  situationActionText,
  isRandomMessage,
  randomMessage,
  situationStateText,
  promiseText,
  emotionType,
  isRefresh = false,
}: NoteCardProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.card, style]}>
        <View style={styles.imageContainer}>
          <ResponsiveImage
            source={{ uri: imageUrl }}
            width={317}
            initialHeight={176}
          />
          <View style={styles.date}>
            <CustomText variant='body3'>{date}</CustomText>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ marginTop: 20, marginBottom: 24 }}>
            <FeelingText text={emotionText} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <SituationText
              topText={situationActionText}
              bottomText={situationStateText}
            />
          </View>
          <View style={{ marginBottom: 24 }}>
            <PromiseText text={promiseText} />
          </View>
          <View style={{ marginBottom: 24 }}>
            <RandomMessage
              emotionType={emotionType}
              initialText={randomMessage}
              isRefresh={isRefresh}
            />
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
  date: {
    position: 'absolute',
    top: 16,
    left: 16,
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
