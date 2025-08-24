import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export default function GrowthSection() {
  // 받은 칭찬 추이 데이터 (최근 3개월)
  const praiseData = [
    { value: 18, label: '1주차' },
    { value: 28, label: '2주차' },
    { value: 34, label: '3주차' },
    { value: 50, label: '4주차' },
    { value: 72, label: '5주차' },
  ];

  // 그래프 너비에 따른 동적 spacing 계산 (padding 32px 고려)
  const chartWidth = 248; // 280 - 32(padding)
  const dynamicSpacing =
    praiseData.length > 1 ? (chartWidth - 40) / (praiseData.length - 1) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.areaTitle}>
        <CustomText
          variant='body1'
          fontWeight='bold'
          color={GreyColors.grey800}
        >
          나의 지난달 대비 성장
        </CustomText>
        <Icon name='info' size={16} color={GreyColors.grey400} />
      </View>
      <CustomText
        variant='body2'
        color={GreyColors.grey600}
        fontWeight='medium'
        style={styles.areaSubtitle}
      >
        1일 ~ 18일을 기준으로 지난달과 비교했어요
      </CustomText>
      <View style={styles.growthKeywordCard}>
        <CustomText
          variant='body2'
          color={GreyColors.grey800}
          fontWeight='semibold'
          style={styles.growthKeywordTitle}
        >
          늘어난 칭찬
        </CustomText>
        <View style={styles.growthKeywordContent}>
          <CustomText
            variant='body2'
            color={PrimaryColors.blue100}
            fontWeight='medium'
            style={styles.growthKeyword}
          >
            함께해서 좋은 시간을 보냈어요
          </CustomText>
          <CustomText
            variant='body2'
            color={PrimaryColors.blue100}
            fontWeight='medium'
            style={styles.growthKeywordQantity}
          >
            +5회
          </CustomText>
        </View>
      </View>
      <View style={styles.growthKeywordCard}>
        <CustomText
          variant='body2'
          color={GreyColors.grey800}
          fontWeight='semibold'
          style={styles.growthKeywordTitle}
        >
          줄어든 불만
        </CustomText>
        <View style={styles.growthKeywordContent}>
          <CustomText
            variant='body2'
            color={PrimaryColors.blue100}
            fontWeight='medium'
            style={styles.growthKeyword}
          >
            알람을 끄지 않았어요
          </CustomText>
          <CustomText
            variant='body2'
            color={PrimaryColors.blue100}
            fontWeight='medium'
            style={styles.growthKeywordQantity}
          >
            -4회
          </CustomText>
        </View>
      </View>
      <View style={styles.growthGraph}>
        <CustomText
          variant='body2'
          color={GreyColors.grey800}
          fontWeight='semibold'
          style={styles.chartTitle}
        >
          받은 칭찬 추이
        </CustomText>
        <LineChart
          areaChart1
          data={praiseData}
          width={chartWidth}
          height={160}
          color={PrimaryColors.blue100}
          thickness={2}
          dataPointsColor={PrimaryColors.blue100}
          dataPointsRadius={6}
          dataPointsHeight={6}
          dataPointsWidth={6}
          curved
          backgroundColor='transparent'
          hideRules={false}
          rulesColor={GreyColors.grey200}
          rulesType='dashed'
          rulesThickness={1}
          dashWidth={2}
          dashGap={4}
          hideYAxisText={false}
          yAxisTextStyle={{
            color: GreyColors.grey400,
            fontSize: 13,
          }}
          hideAxesAndRules={false}
          xAxisColor={GreyColors.grey300}
          xAxisThickness={2}
          showXAxisIndices={false}
          xAxisLabelTextStyle={{
            color: GreyColors.grey600,
            fontSize: 13,
          }}
          xAxisLabelsVerticalShift={8}
          showVerticalLines={true}
          verticalLinesColor={PrimaryColors.blue100}
          verticalLinesStrokeDashArray={[2, 4]}
          verticalLinesUptoDataPoint={true}
          verticalLinesThickness={1.4}
          verticalLinesZIndex={1}
          isAnimated
          animationDuration={1500}
          areaChart
          startFillColor='rgba(132, 191, 243, 0.3)'
          endFillColor='rgba(229, 241, 255, 0.1)'
          maxValue={Math.max(...praiseData.map((praise) => praise.value))}
          stepValue={20}
          spacing={dynamicSpacing}
          initialSpacing={25}
          endSpacing={20}
          disableScroll
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    paddingTop: 24,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  areaTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 4,
  },
  areaSubtitle: {
    marginBottom: 12,
  },
  growthKeywordCard: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  growthKeywordTitle: {
    marginBottom: 9,
  },
  growthKeywordContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  growthKeyword: {
    marginBottom: 4,
  },
  growthKeywordQantity: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: PrimaryColors.blue300,
  },
  growthGraph: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  chartTitle: {
    marginBottom: 20,
  },
});