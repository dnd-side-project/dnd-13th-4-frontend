import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { GreyColors } from '@/constants/Colors';
import { getGraphicUrl } from '@/constants/graphic';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, View } from 'react-native';

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
      <View style={styles.container}>
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
          <View style={styles.filterContainer}>
            <CustomText variant='body3' color={GreyColors.grey600}>
              최신 순
            </CustomText>
            <Icon
              style={styles.leftToDown}
              name='expandLeft'
              color={GreyColors.grey600}
              size={16}
            />
          </View>
        </View>
      </View>
      <View style={styles.gridContainer}>
        {[1, 2, 3, 4].map((_, i) => (
          <ImageBackground
            key={i}
            source={{
              uri: getGraphicUrl({ kind: 'awkward', page: 'storage' }),
            }}
            style={styles.imageBg}
            imageStyle={styles.imageRadius} // 이미지 자체 라운드
          >
            {/* 하단 가독성 보정용 그라데이션 (선택) */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.05)']}
              style={styles.fade}
            />
            <CustomText
              variant='body3'
              color={GreyColors.grey600}
              style={styles.date}
            >
              25.08.07
            </CustomText>
          </ImageBackground>
        ))}
      </View>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: { alignSelf: 'center', paddingVertical: 16 },
  container: {},
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
  filterContainer: { flexDirection: 'row', alignItems: 'center' },
  leftToDown: { transform: [{ rotate: '-90deg' }] },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  imageBg: {
    width: '80%',
    aspectRatio: 1, // 정사각형(166x166과 유사). 필요시 고정 height로 변경
    justifyContent: 'flex-end', // 하단에 날짜 배치
  },
  imageRadius: { borderRadius: 12 },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
  },
  date: {
    padding: 8,
  },
});
