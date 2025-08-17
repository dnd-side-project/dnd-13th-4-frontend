import CTAButton from '@/components/button/CTAButton';
import Carousel from '@/components/carousel/Carousel';
import { CustomText } from '@/components/CustomText';
import NoteCreateFeelingHeader from '@/components/notes/feeling/NoteCreateFeelingHeader';
import { getGraphicUrl } from '@/constants/graphic';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const SCREEN_W = Dimensions.get('window').width;

const Feeling = () => {
  return (
    <View style={styles.container}>
      <NoteCreateFeelingHeader />
      <CustomText>감정. 룸메에게 어떤 마음을 전하고 싶나요?</CustomText>
      <View>
        <Carousel
          width={SCREEN_W}
          height={291}
          itemList={[
            <Image
              key={getGraphicUrl({ page: 'emotion_select', kind: 'awkward' })}
              source={{
                uri: getGraphicUrl({ page: 'emotion_select', kind: 'awkward' }),
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />,
            <Image
              key={getGraphicUrl({
                page: 'emotion_select',
                kind: 'disappointed',
              })}
              source={{
                uri: getGraphicUrl({
                  page: 'emotion_select',
                  kind: 'disappointed',
                }),
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />,
            <Image
              key={getGraphicUrl({ page: 'emotion_select', kind: 'grateful' })}
              source={{
                uri: getGraphicUrl({
                  page: 'emotion_select',
                  kind: 'grateful',
                }),
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />,
            <Image
              key={getGraphicUrl({ page: 'emotion_select', kind: 'joyful' })}
              source={{
                uri: getGraphicUrl({ page: 'emotion_select', kind: 'joyful' }),
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />,
            <Image
              key={getGraphicUrl({ page: 'emotion_select', kind: 'reliable' })}
              source={{
                uri: getGraphicUrl({
                  page: 'emotion_select',
                  kind: 'reliable',
                }),
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />,
            <Image
              key={getGraphicUrl({
                page: 'emotion_select',
                kind: 'uncomfortable',
              })}
              source={{
                uri: getGraphicUrl({
                  page: 'emotion_select',
                  kind: 'uncomfortable',
                }),
              }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />,
          ]}
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
  },
  buttonContainer: {
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
});
