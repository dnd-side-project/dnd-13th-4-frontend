import CTAButton from '@/components/button/CTAButton';
import Carousel from '@/components/carousel/Carousel';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import ResponsiveImage from '@/components/Image/ResponsiveImage';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { modal } from '@/components/modal/modal';
import { EMOTION_MOCK_LIST } from '@/components/notes/constants/mockData';
import useEmotionTemplatesQuery from '@/components/notes/feeling/module/useEmotionTemplatesQuery';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateFeelingHeader from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { useNoteCreateStore } from '@/store/noteCreate.store';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

// TODO : isMatched는 API연동을 해야함.
export const isMatched = false;

const Feeling = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(EMOTION_MOCK_LIST[0]);
  const { width: screenWidth } = useWindowDimensions();
  const { setEmotion } = useNoteCreateStore();
  const { data, isLoading, isError } = useEmotionTemplatesQuery({
    emotionType: 'positive',
  });

  const changeEmotion = (newIndex: number): void => {
    setSelectedItem(EMOTION_MOCK_LIST[newIndex]);
  };

  const handleSubmit = (): void => {
    setEmotion(selectedItem);
    router.navigate('/notes/ActionFirst');
  };

  useEffect(() => {
    if (!isMatched) {
      const timerId = setTimeout(
        () =>
          modal.show({
            title: '잠깐!',
            description: `룸메가 초대에 응하면\n마음쪽지를 보낼 수 있어요.\n지금은 미리 체험만 가능해요!`,
            confirmText: '확인',
          }),
        1000,
      );

      return () => clearTimeout(timerId);
    }
  }, []);

  if (isLoading) {
    /** 로딩 UI */
    return null;
  }
  if (isError || !data) {
    /** 에러 UI */
    return null;
  }

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
                {selectedItem.text}
              </CustomText>
            </View>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              마음을 전해요.
            </CustomText>
          </View>
        </NoteCreateFeelingHeader>
      }
      background={{
        type: 'gradient',
        colors: ['#F5FAFF', '#C1DEFF'],
        locations: [0, 0.4],
      }}
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
            itemWidth={210}
            itemGap={28}
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
          <CTAButton text='다음' active onPress={handleSubmit} />
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
    backgroundColor: '#ffffff',
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
