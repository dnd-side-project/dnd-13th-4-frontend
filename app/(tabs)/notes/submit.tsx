import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import FromToText from '@/components/notes/submit/FromToText';
import NoteCard from '@/components/notes/submit/NoteCard';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { useNoteCreateStore } from '@/store/noteCreate.store';
import { toast } from '@/store/toast.store';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { isMatched } from './feeling';

const BACKGROUND_IMAGE =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/create_letter_sample_+background.png';

// ✅ S3 이미지 URL
const imageUrl =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/letter_detail/uncomfortable.png';

const Submit = () => {
  const router = useRouter();
  const { reset, emotion, promise, situationAction, situationState } =
    useNoteCreateStore();

  const handleSubmit = () => {
    router.replace('/');
    toast.show('마음쪽지를 룸메이트에게 전달했어요');
    reset();
    // TODO: 제출동작 구현
  };

  return (
    <SafeScreenLayout
      background={{
        type: 'image',
        uri: BACKGROUND_IMAGE,
      }} // TODO : 개발환경에서 깜빡임 발생함. 최적화 필요함.
      style={styles.container}
      header={
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole='button'
            accessibilityLabel='뒤로 가기'
          >
            <Icon
              style={styles.backIcon}
              color={GreyColors.grey600}
              size={30}
              name='expandLeft'
            />
          </Pressable>
          <CustomText
            style={styles.headerText}
            color={GreyColors.grey700}
            variant='body1'
          >
            마음쪽지 생성
          </CustomText>
          <View style={{ width: 30 }} />
        </View>
      }
    >
      <View style={styles.contentContainer}>
        <View style={{ paddingTop: 24, paddingBottom: '10%' }}>
          <FromToText text={`예림님의 마음,\n지우님에게 잘 전달할게요`} />
        </View>
        <View style={{ position: 'relative' }}>
          <NoteCard
            date={'8월 7일'}
            emotionText={emotion?.text ?? ''}
            imageUrl={imageUrl}
            promiseText={promise?.text ?? ''}
            situationActionText={situationAction?.text ?? ''}
            situationStateText={situationState?.text ?? ''}
            randomMessage={'지금처럼만 하면 우리 룸메 계약 연장 가능✨'}
            emotionType={'negative'} // TODO emotion 보면서 negative , positive 정해야함.
            isRefresh
            style={{ zIndex: 100 }}
          />
        </View>
        <View style={styles.buttonContainer}>
          {!isMatched && (
            <CustomText
              variant='body3'
              fontWeight='bold'
              color={PrimaryColors.blueText}
            >
              👀 미리 체험 중
            </CustomText>
          )}

          <CTAButton
            onPress={handleSubmit}
            style={{ alignSelf: 'flex-end' }}
            text='마음쪽지 보내기'
            active
            disabled={!isMatched}
          />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default Submit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 16,
    flex: 1,
  },
  backIcon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {},
  buttonContainer: {
    alignItems: 'center',
    gap: 8,
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
});
