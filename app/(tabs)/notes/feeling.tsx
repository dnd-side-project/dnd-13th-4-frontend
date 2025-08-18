import CTAButton from '@/components/button/CTAButton';
import Carousel from '@/components/carousel/Carousel';
import { CustomText } from '@/components/CustomText';
import ResponsiveImage from '@/components/Image/ResponsiveImage';
import { EMOTION_LIST } from '@/components/notes/feeling/constants/emotions';
import NoteCreateFeelingHeader from '@/components/notes/feeling/NoteCreateFeelingHeader';
import { GreyColors } from '@/constants/Colors';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const SCREEN_W = Dimensions.get('window').width;

const Feeling = () => {
  const [index, setIndex] = useState(0);
  const emotion = EMOTION_LIST[index];

  const changeIndex = (newIndex: number): void => setIndex(newIndex);

  return (
    <View style={styles.container}>
      <NoteCreateFeelingHeader emotionLabel={emotion.label} />
      <View style={styles.feelingContainer}>
        <CustomText
          variant='body1'
          fontWeight='bold'
          color={GreyColors.grey400}
        >
          감정.
        </CustomText>
        <CustomText
          variant='body1'
          fontWeight='bold'
          color={GreyColors.grey800}
        >
          룸메에게 어떤 마음을 전하고 싶나요?
        </CustomText>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          width={SCREEN_W}
          height={305}
          onChange={changeIndex}
          itemList={EMOTION_LIST.map((emotion) => (
            <View key={emotion.uri} style={styles.shadowContainer}>
              <View style={styles.imageContainer}>
                <ResponsiveImage
                  source={{ uri: emotion.uri }}
                  width={210}
                  style={styles.image}
                />
              </View>
            </View>
          ))}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CTAButton style={{ alignSelf: 'flex-end' }} text='다음' active />
      </View>
    </View>
  );
};

export default Feeling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 16,
  },
  feelingContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  carouselContainer: { marginTop: 50 },
  shadowContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',

    borderRadius: 20,

    // iOS 전용
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Android 전용
    elevation: 6,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 210,
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',

    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 'auto',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});
