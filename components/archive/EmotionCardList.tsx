import { GreyColors } from '@/constants/Colors';
import { formatDaysAgo } from '@/lib/time';
import { useRouter } from 'expo-router';
import { Ref } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';
import GridList from '../ui/gridList';
import EmptyCardList from './EmptyCardList';
import { useSavedNotesQuery } from './hooks/useSavedNotesQuery';

type Props = {
  ref?: Ref<FlatList>;
};

const EmotionCardList = ({ ref }: Props) => {
  const router = useRouter();
  const { data, isLoading, isError } = useSavedNotesQuery();

  if (isLoading) {
    return null;
  }
  if (isError || !data || data.length === 0) {
    return <EmptyCardList />;
  }

  return (
    <GridList
      ref={ref}
      data={data}
      numColumns={2}
      gap={16}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.gridContent}
      renderItem={({ item }) => (
        <Pressable
          style={styles.cardContainer}
          onPress={() => {
            router.push({
              pathname: '/archive/[noteId]',
              params: { noteId: item.id },
            });
          }}
        >
          <ImageBackground
            source={{
              uri: item.emotion.previewImageUrl,
            }}
            style={styles.card}
            imageStyle={styles.imageRadius}
          >
            <CustomText
              variant='body3'
              color={GreyColors.grey500}
              style={styles.date}
            >
              {formatDaysAgo(item.createdAt)}
            </CustomText>
          </ImageBackground>
        </Pressable>
      )}
    />
  );
};

export default EmotionCardList;

const styles = StyleSheet.create({
  gridContent: {
    paddingBottom: 24,
    gap: 16,
  },
  cardContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,

    borderWidth: 1,
    borderColor: '#ffffff',
  },

  card: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden', // 여기선 이미지/내용만 잘라줌
    justifyContent: 'flex-end',
  },
  imageRadius: { borderRadius: 12 },

  date: { paddingVertical: 10, paddingHorizontal: 12 },
});
