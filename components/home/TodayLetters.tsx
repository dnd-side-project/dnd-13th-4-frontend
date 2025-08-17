import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import LetterCard from './TodayLetter';

export const TodayLetters = () => {
  const [clickedCards, setClickedCards] = useState<Set<number>>(new Set());

  const handleCardPress = (index: number) => {
    setClickedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

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
        data={new Array(5).fill(0)}
        renderItem={({ index }) => {
          const isClicked = clickedCards.has(index);

          return (
            <Pressable onPress={() => handleCardPress(index)}>
              {isClicked ? (
                <LetterCard
                  url={''}
                  endTime={''}
                  isRead={isClicked}
                  index={index}
                />
              ) : (
                <LetterCard
                  url={''}
                  endTime={''}
                  isRead={isClicked}
                  index={index}
                  colors={['#5BA4FA', '#45E5DD', '#5BA4FA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              )}
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
  },
  cardContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
