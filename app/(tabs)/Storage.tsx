import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import Filter from '@/components/storage/Filter';
import { GreyColors } from '@/constants/Colors';
import { getGraphicUrl } from '@/constants/graphic';
import React from 'react';
import {
  FlatList, // ✅ 추가
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

const DATA = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  date: '25.08.07',
  kind: 'awkward' as const,
}));

export default function Storage() {
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
            모아둔 마음쪽지 12개
          </CustomText>
        </View>
        <View>
          <Filter />
        </View>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              /** TODO : 마음쪽지 페이지 이동 */
            }}
            style={styles.cardContainer}
          >
            <ImageBackground
              source={{
                uri: getGraphicUrl({ kind: item.kind, page: 'storage' }),
              }}
              style={styles.card}
              imageStyle={styles.imageRadius}
            >
              <CustomText
                variant='body3'
                color={GreyColors.grey500}
                style={styles.date}
              >
                {item.date}
              </CustomText>
            </ImageBackground>
          </Pressable>
        )}
      />
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
