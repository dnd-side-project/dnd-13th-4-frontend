import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import useLatestNotesQuery from '@/hooks/api/useLatestNotesQuery';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import EmptyTodayLetter from './EmptyLetter';
import LetterCard from './TodayLetter';

const MAX_LETTER_COUNT_IN_VIWEPORT = 3;

export const TodayLetters = () => {
  const { data: latestNotes = [], isLoading } = useLatestNotesQuery();

  const handleCardPress = (noteId?: number) => {
    if (noteId) {
      router.push(`/ReadMindLetter?id=${noteId}`);
    }
  };

  const notesCount = latestNotes.length;
  const letterData =
    notesCount > MAX_LETTER_COUNT_IN_VIWEPORT
      ? latestNotes.slice(0, 5)
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
        받은 마음쪽지는 24시간 내에 사라져요.
      </CustomText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.todayLettersContent}
        style={styles.todayLetters}
        data={letterData}
        renderItem={({ item, index }) => {
          if (!item) {
            return <EmptyTodayLetter />;
          }

          return (
            <Pressable onPress={() => handleCardPress(item.id)}>
              <LetterCard
                url={item.emotion?.graphicUrl || ''}
                endTime={''}
                isRead={item.isRead || false}
                index={index}
                colors={['#5BA4FA', '#45E5DD', '#5BA4FA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
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
    marginBottom: 14,
  },
  todayLetters: {
    paddingVertical: 16,
    marginHorizontal: -24,
    marginBottom: 4,
  },
  todayLettersContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
});
