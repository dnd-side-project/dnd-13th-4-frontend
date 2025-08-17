import CTAButton from '@/components/button/CTAButton';
import Carousel from '@/components/carousel/Carousel';
import { CustomText } from '@/components/CustomText';
import { EMOTION_LIST } from '@/components/notes/feeling/constants/emotions';
import NoteCreateFeelingHeader from '@/components/notes/feeling/NoteCreateFeelingHeader';
import { GreyColors } from '@/constants/Colors';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

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
          height={291}
          onChange={changeIndex}
          itemList={EMOTION_LIST.map((emotion) => (
            <Image
              key={emotion.uri}
              source={{ uri: emotion.uri }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />
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
  carouselContainer: { marginTop: 60 },
  buttonContainer: {
    marginTop: 'auto',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});
