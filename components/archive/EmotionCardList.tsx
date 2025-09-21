import { GreyColors } from '@/constants/Colors';
import { formatDaysAgo } from '@/lib/time';
import { useRouter } from 'expo-router';
import { Ref } from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { CustomText } from '../CustomText';
import GridList from '../ui/gridList';
import EmptyCardList from './EmptyCardList';
import { SortOption, useSavedNotesQuery } from './hooks/useSavedNotesQuery';

const NUM_COLS = 2;
const H_PADDING = 20;
const GAP = 20;

type Props = {
  ref?: Ref<FlatList>;
  sort: SortOption;
};

const EmotionCardList = ({ ref, sort }: Props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { data, isLoading, isError } = useSavedNotesQuery({ sort });

  const itemSize = Math.floor(
    (width - H_PADDING * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS,
  );

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
          style={[styles.cardContainer, { width: itemSize, height: itemSize }]}
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
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  imageRadius: { borderRadius: 12 },

  date: { paddingVertical: 10, paddingHorizontal: 12 },
});
