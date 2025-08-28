import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import EmotionCardList from '@/components/storage/EmotionCardList';
import Filter from '@/components/storage/Filter';
import { useSavedNotesQuery } from '@/components/storage/module/useSavedNotesQuery';
import { GreyColors } from '@/constants/Colors';
import React, { useRef } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

export default function Storage() {
  const listRef = useRef<FlatList>(null);
  const { data, isLoading, isError } = useSavedNotesQuery();

  const handleScrollTop = (): void => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };
  return (
    <SafeScreenLayout
      header={
        <View style={styles.header}>
          <CustomText>보관함</CustomText>
        </View>
      }
      background={{ type: 'solid', color: '#ffffff' }}
    >
      <View style={styles.top}>
        <View style={styles.totalContainer}>
          <Icon
            style={styles.messageIcon}
            name='messageFill'
            color={GreyColors.grey600}
            size={16}
          />
          <CustomText variant='body2' color={GreyColors.grey600}>
            모아둔 마음쪽지 {data?.length ?? ` `}개
          </CustomText>
        </View>
        <View>
          <Filter />
        </View>
      </View>

      <EmotionCardList ref={listRef} />

      <Pressable style={styles.topButton} onPress={handleScrollTop}>
        <Icon name='arrowTop' size={24} color={GreyColors.grey500} />
      </Pressable>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: { alignSelf: 'center', paddingVertical: 16 },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  totalContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  messageIcon: {
    backgroundColor: GreyColors.grey200,
    borderRadius: 999,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderColor: GreyColors.grey200,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
  },
});
