import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import EmotionCardList from '@/components/storage/EmotionCardList';
import Filter from '@/components/storage/Filter';
import { GreyColors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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

      <EmotionCardList />
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
});
