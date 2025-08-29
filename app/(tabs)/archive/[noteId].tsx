import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { EmotionType } from '@/components/notes/hooks/useClosingTemplatesQuery';
import FromToText from '@/components/notes/submit/FromToText';
import NoteCard from '@/components/notes/submit/NoteCard';
import { GreyColors } from '@/constants/Colors';
import useNoteQuery from '@/hooks/api/useNoteQuery';
import { formatDaysAgo } from '@/lib/time';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const BACKGROUND_IMAGE =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/create_letter_sample_+background.png';

const NoteDetail = () => {
  const router = useRouter();
  const { noteId } = useLocalSearchParams<{ noteId: string }>();
  const { data, isLoading, isError } = useNoteQuery({ noteId: Number(noteId) });

  const handleDelete = (): void => {
    /** TODO 추후구현 */
    router.replace('/archive');
  };

  if (isLoading) {
    return null;
  }
  if (isError || !data) {
    return null;
  }

  const { action, closing, createdAt, emotion, promise, situation } = data;

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
            보관된 마음 쪽지
          </CustomText>
          <View style={{ width: 32 }} />
          {/* TODO : 삭제API미구현 */}
          {/* <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <CustomText
              variant='body1'
              fontWeight='bold'
              color={PrimaryColors.blueText}
            >
              삭제
            </CustomText>
          </Pressable> */}
        </View>
      }
    >
      <View style={styles.contentContainer}>
        <View style={{ paddingTop: 24, paddingBottom: '10%' }}>
          <FromToText text={`룸메이트가 보낸\n마음을 확인해 보세요`} />
        </View>
        <View style={{ position: 'relative' }}>
          <NoteCard
            date={formatDaysAgo(createdAt)}
            emotionText={emotion.text}
            imageUrl={emotion.archiveImageUrl}
            promiseText={promise.text}
            situationActionText={action.text}
            situationStateText={situation.text}
            emotionType={emotion.emotionType as EmotionType}
            randomMessage={closing.text}
            style={{ zIndex: 100 }}
          />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default NoteDetail;

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
  deleteButton: { paddingHorizontal: 4, paddingVertical: 7 },
});
