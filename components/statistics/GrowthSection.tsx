import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import GrowthKeywordCard from '@/components/statistics/GrowthKeywordCard';
import { GreyColors } from '@/constants/Colors';
import useMyGrowthQuery from '@/hooks/api/useMyGrowthQuery';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useIsMatched } from '../mypage/hooks/useMeQuery';

const CHART_WIDTH = 300; // 그래프 너비 확장

export default function GrowthSection() {
  const { data } = useMyGrowthQuery();

  const isMatched = useIsMatched();

  // 누적값으로 변환 및 라벨 설정 (데이터 가드   동적 라벨)
  const cumulativeData = React.useMemo(() => {
    const weekly = data?.weeklyPositiveNoteCounts ?? [];
    if (weekly.length === 0) return [];
    let cumulative = 0;
    const lastIdx = weekly.length - 1;
    const midIdx = Math.round(lastIdx / 2);
    return weekly.map((item, index) => {
      cumulative = item.value;
      let label = '';
      if (index === 0) label = '2개월전';
      else if (index === midIdx) label = '1개월전';
      else if (index === lastIdx) label = '현재';
      return { ...item, value: cumulative, label };
    });
  }, [data]);

  const dynamicSpacing =
    cumulativeData.length > 1
      ? (CHART_WIDTH - 60) / (cumulativeData.length - 1)
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
        title='늘어난 칭찬'
        actionText={data.increasedPositiveAction.text}
        changeAmount={data.increasedPositiveAction.change}
        isMatched={isMatched}
        isPositive={true}
      />
      <GrowthKeywordCard
        title='줄어든 불만'
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
            data={cumulativeData}
            width={CHART_WIDTH}
            height={200}
            color='#5BB3F3'
            thickness={3}
            dataPointsColor='#5BB3F3'
            dataPointsRadius={5}
            hideDataPoints={false}
            curved
            backgroundColor='transparent'
            hideRules={false}
            rulesColor={GreyColors.grey200}
            rulesType='dashed'
            rulesThickness={1}
            dashWidth={3}
            dashGap={3}
            hideYAxisText={false}
            yAxisTextStyle={{
              color: GreyColors.grey400,
              fontSize: 12,
              fontWeight: '400',
            }}
            hideAxesAndRules={false}
            xAxisColor={GreyColors.grey300}
            xAxisThickness={1}
            showXAxisIndices={false}
            xAxisLabelTextStyle={{
              color: GreyColors.grey600,
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'left',
              width: 80,
            }}
            xAxisLabelsVerticalShift={12}
            xAxisTextNumberOfLines={1}
            rotateLabel={false}
            showVerticalLines={true}
            verticalLinesColor={GreyColors.grey200}
            verticalLinesStrokeDashArray={[3, 3]}
            verticalLinesUptoDataPoint={true}
            verticalLinesThickness={1}
            hideOrigin={true}
            isAnimated
            animationDuration={1200}
            areaChart
            startFillColor='#84BFF3'
            endFillColor='#E5F1FF'
            startOpacity={0.7}
            endOpacity={0.1}
            gradientDirection='vertical'
            maxValue={Math.max(
              ...(cumulativeData.length > 0
                ? cumulativeData.map((item) => item.value)
                : [60]),
              20,
            )}
            stepValue={10}
            spacing={dynamicSpacing}
            initialSpacing={40}
            endSpacing={40}
            xAxisLabelTexts={cumulativeData.map((item) => item.label)}
            disableScroll
            focusEnabled={false}
            adjustToWidth
          />
          {cumulativeData.length === 0 && (
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
    height: 200,
  },
  emptyChartText: {
    backgroundColor: GreyColors.grey600,
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
