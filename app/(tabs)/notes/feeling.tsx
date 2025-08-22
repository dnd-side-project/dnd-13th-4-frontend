import CTAButton from '@/components/button/CTAButton';
import Carousel from '@/components/carousel/Carousel';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import ResponsiveImage from '@/components/Image/ResponsiveImage';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { EMOTION_MOCK_LIST } from '@/components/notes/constants/mockData';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateFeelingHeader from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { EMOTION_TEMPLATE_PATH } from '@/constants/api';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { api } from '@/lib/api';
import { useNoteCreateStore } from '@/store/note-create.store';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const Feeling = () => {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { emotion, setEmotion } = useNoteCreateStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: [EMOTION_TEMPLATE_PATH, 'positive'], // NOTE : 여기는 담당 개발자 판단에 따라
    queryFn: async () => {
      const { data } = await api.get<{
        id: number;
        emotionType: string;
        text: string;
      }>({
        path: EMOTION_TEMPLATE_PATH,
        params: { emotionType: 'positive' },
      });

      return data;
    },
  });

  const changeEmotion = (newIndex: number): void => {
    setEmotion(EMOTION_MOCK_LIST[newIndex]);
  };

  if (isLoading) {
    /** 로딩 UI */
    return null;
  }
  if (isError || !data) {
    /** 에러 UI */
    return null;
  }

  console.log(data);

  return (
    <SafeScreenLayout
      header={
        <NoteCreateFeelingHeader>
          <View style={styles.previewDescription}>
            <Icon size={15} name='altFill' color={GreyColors.grey500} />
            <CustomText variant='body3' color={GreyColors.grey500}>
              룸메에게 보낼 내용 미리보기
            </CustomText>
          </View>
          <View style={styles.preview}>
            <View style={styles.feelingBox}>
              <CustomText color={PrimaryColors.blue100} variant='head3'>
                {emotion.text}
              </CustomText>
            </View>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              마음을 전해요.
            </CustomText>
          </View>
        </NoteCreateFeelingHeader>
      }
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.guideContainer}>
          <NoteCreateGuide
            leftText='감정.'
            rightText='룸메에게 어떤 마음을 전하고 싶나요?'
          />
        </View>
        <View style={styles.carouselContainer}>
          <Carousel
            width={screenWidth}
            height={305}
            onChange={changeEmotion}
            itemList={EMOTION_MOCK_LIST.map(({ emotionType, graphicUrl }) => (
              <View key={graphicUrl} style={styles.shadowContainer}>
                <View style={styles.imageContainer}>
                  <ResponsiveImage
                    source={{ uri: graphicUrl }}
                    width={210}
                    style={styles.image}
                  />
                </View>
              </View>
            ))}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CTAButton
            text='다음'
            active
            onPress={() => router.navigate('/notes/action-first')}
          />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default Feeling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  previewDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 6,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feelingBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PrimaryColors.blue200,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  feelingContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 16,
  },
  guideContainer: { paddingHorizontal: 20 },
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
