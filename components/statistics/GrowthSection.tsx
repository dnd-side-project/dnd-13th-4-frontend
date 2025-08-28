import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import GrowthKeywordCard from '@/components/statistics/GrowthKeywordCard';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import useMyGrowthQuery from '@/hooks/api/useMyGrowthQuery';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const CHART_WIDTH = 248; // 280 - 32(padding)

export default function GrowthSection() {
  const { data } = useMyGrowthQuery();

  const isMatched = process.env.EXPO_PUBLIC_IS_MATCHED === 'true';

  const dynamicSpacing =
    data.weeklyPositiveNoteCounts.length > 1
      ? (CHART_WIDTH - 40) / (data.weeklyPositiveNoteCounts.length - 1)
      : 0;

  return (
    <View style={styles.container}>
      <View style={styles.areaTitle}>
        <CustomText
          variant='body1'
          fontWeight='bold'
          color={GreyColors.grey800}
        >
          나의 성장 리포트
        </CustomText>
        <Icon name='info' size={16} color={GreyColors.grey400} />
      </View>
      <CustomText
        variant='body2'
        color={GreyColors.grey600}
        fontWeight='medium'
        style={styles.areaSubtitle}
      >
        {isMatched
          ? '1일 ~ 18일을 기준으로 지난달과 비교했어요'
          : '지난 날보다 좋아진 데이터를 보여줘요'}
      </CustomText>
      <GrowthKeywordCard
        title="늘어난 칭찬"
        actionText={data.increasedPositiveAction.text}
        changeAmount={data.increasedPositiveAction.change}
        isMatched={isMatched}
        isPositive={true}
      />
      <GrowthKeywordCard
        title="줄어든 불만"
        actionText={data.decreasedNegativeAction.text}
        changeAmount={data.decreasedNegativeAction.change}
        isMatched={isMatched}
        isPositive={false}
      />
      <View style={styles.growthGraph}>
        <CustomText
          variant='body2'
          color={GreyColors.grey800}
          fontWeight='semibold'
          style={styles.chartTitle}
        >
          받은 칭찬 추이
        </CustomText>
        <View style={styles.chartContainer}>
          <LineChart
            areaChart1
            data={data.weeklyPositiveNoteCounts}
            width={CHART_WIDTH}
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
            maxValue={Math.max(
              ...(data.weeklyPositiveNoteCounts.length > 0
                ? data.weeklyPositiveNoteCounts.map((item) => item.value)
                : [60]),
              20,
            )}
            stepValue={10}
            spacing={dynamicSpacing}
            initialSpacing={25}
            endSpacing={20}
            disableScroll
          />
          {data.weeklyPositiveNoteCounts.length === 0 && (
            <View style={styles.emptyChartOverlay}>
              <CustomText
                variant='body2'
                color={GreyColors.grey500}
                style={styles.emptyChartText}
              >
                아직 보여드릴 내용이 없어요
              </CustomText>
            </View>
          )}
        </View>
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
  chartContainer: {
    position: 'relative',
  },
  emptyChartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
  },
  emptyChartText: {
    backgroundColor: GreyColors.grey600,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
