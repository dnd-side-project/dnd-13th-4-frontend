import ProgressBar from '@/components/bar/ProgressBar';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import StarPhysics from '@/components/statistics/StarPhysics';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface BottleSectionProps {
  refreshKey: number;
  onRefresh: () => void;
}

export default function BottleSection({
  refreshKey,
  onRefresh,
}: BottleSectionProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${S3_IMAGE_URL}/statistics/big_bottle.png`,
        }}
        style={styles.bottleImage}
      />
      <TouchableOpacity onPress={onRefresh} style={styles.starPhysicsContainer}>
        <StarPhysics
          key={refreshKey}
          width={220}
          height={240}
          starCount={42}
        />
      </TouchableOpacity>
      <View style={styles.weeklyInfoHeader}>
        <CustomText variant='body2' color='white' fontWeight='medium'>
          이번주
        </CustomText>
        <CustomText
          variant='body2'
          color='white'
          fontWeight='medium'
          style={styles.weeklyProgress}
        >
          19 / 42개
        </CustomText>
        <Icon name={'info'} size={16} color='white' />
      </View>
      <ProgressBar percentage={45} backgroundColor='white' />
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <CustomText variant='body3' color={'#989DA3'}>
            이번 주 받은 쪽지
          </CustomText>
          <CustomText
            variant='body1'
            fontWeight='medium'
            color={GreyColors.grey800}
          >
            11개
          </CustomText>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <CustomText variant='body3' fontWeight='medium' color={'#989DA3'}>
            이번 주 보낸 쪽지
          </CustomText>
          <CustomText
            variant='body1'
            fontWeight='medium'
            color={GreyColors.grey800}
          >
            8개
          </CustomText>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <CustomText variant='body3' color={'#989DA3'}>
            마음을 나눈지
          </CustomText>
          <CustomText
            variant='body1'
            fontWeight='medium'
            color={GreyColors.grey800}
          >
            168일째
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bottleImage: {
    width: 320,
    height: 400,
    resizeMode: 'contain',
  },
  starPhysicsContainer: {
    position: 'absolute',
    height: 240,
    width: 220,
    borderRadius: 30,
    top: 95,
  },
  weeklyInfoHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  weeklyProgress: {
    flex: 1,
    textAlign: 'right',
    marginRight: 4,
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: GreyColors.grey200,
  },
});