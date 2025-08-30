import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import useLatestNotesQuery from '@/hooks/api/useLatestNotesQuery';
import { SimpleNoteResponse } from '@/types/api';
import { router } from 'expo-router';
import { Dimensions, FlatList, Pressable, StyleSheet } from 'react-native';
import EmptyTodayLetter from './EmptyLetter';
import LetterCard from './TodayLetter';

const MAX_LETTER_COUNT_IN_VIWEPORT = 3;

// iPhone 11 Pro 사이즈 기준 반응형 값
const SCREEN_WIDTH = Dimensions.get('window').width;
const isLargeScreen = SCREEN_WIDTH >= 375;

export const TodayLetters = () => {
  const { data: latestNotes = [] } = useLatestNotesQuery();

  const handleCardPress = (noteId?: number) => {
    if (noteId) {
      router.push(`/ReadMindLetter?id=${noteId}`);
    }
  };

  const notesCount = latestNotes.length;
  const letterData =
    notesCount > MAX_LETTER_COUNT_IN_VIWEPORT
      ? latestNotes
      : [
          ...latestNotes,
          ...new Array(MAX_LETTER_COUNT_IN_VIWEPORT - notesCount).fill(null),
        ];

  return (
    <>
      <CustomText variant='head1' style={styles.title}>
        오늘 받은 마음쪽지를{'\n'}
        확인해 보세요
      </CustomText>
      <CustomText
        variant='body2'
        color={GreyColors.grey600}
        style={styles.subTitle}
      >
        받은 마음쪽지는 24시간 후에 사라져요.
      </CustomText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.todayLettersContent}
        style={styles.todayLetters}
        data={letterData}
        renderItem={({
          item,
        }: {
          item: SimpleNoteResponse;
        }) => {
          if (!item) {
            return <EmptyTodayLetter />;
          }

          return (
            <Pressable onPress={() => handleCardPress(item.id)}>
              <LetterCard
                url={item.emotion.homeThumbnailUrl}
                createdAt={item.createdAt}
                isRead={item.isRead}
              />
            </Pressable>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 8,
    textAlign: 'left',
  },
  subTitle: {
    marginBottom: isLargeScreen ? 10 : 14,
  },
  todayLetters: {
    paddingVertical: isLargeScreen ? 10 : 16,
    marginHorizontal: -24,
    marginBottom: 4,
    flexGrow: 0, // 내용에 맞춰 크기 조정
    flexShrink: 1,
  },
  todayLettersContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
});
