import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import GrowthKeywordCard from '@/components/statistics/GrowthKeywordCard';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import useMyGrowthQuery from '@/hooks/api/useMyGrowthQuery';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useIsMatched } from '../mypage/hooks/useMeQuery';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - 135; // 컨테이너 패딩 + 여유 공간

export default function GrowthSection() {
  const { data } = useMyGrowthQuery();

  const isMatched = useIsMatched();

  const todayDate = (() => {
    const today = new Date();
    const day = today.getDate();
    return day === 1 ? '' : ` ~${day}일`;
  })();

  // 데이터에 hideDataPoint 속성 추가 (라벨이 없는 포인트는 점 숨김)
  const chartData = React.useMemo(() => {
    const weekly = data?.weeklyPositiveNoteCounts ?? [];
    return weekly.map((item) => ({
      ...item,
      hideDataPoint: !item.label || item.label.trim() === '', // 라벨이 없으면 점 숨김
    }));
  }, [data]);

  const dynamicSpacing =
    chartData.length > 1
      ? Math.floor((CHART_WIDTH - 35) / (chartData.length - 1))
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
          ? `1일${todayDate}을 기준으로 지난달과 비교했어요`
          : '지난 날보다 좋아진 데이터를 보여줘요'}
      </CustomText>
      <GrowthKeywordCard
        title='늘어난 칭찬'
        actionText={data.increasedPositiveAction.text}
        changeAmount={data.increasedPositiveAction.monthlyChange}
        isMatched={isMatched}
        isPositive={true}
      />
      <GrowthKeywordCard
        title='줄어든 불만'
        actionText={data.decreasedNegativeAction.text}
        changeAmount={data.decreasedNegativeAction.monthlyChange}
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
            data={chartData}
            width={CHART_WIDTH}
            height={200}
            color='#5BB3F3'
            thickness={3}
            dataPointsColor='#5BB3F3'
            dataPointsRadius={5}
            hideDataPoints={false}
            maxValue={Math.max(
              ...(chartData.length > 0
                ? chartData.map((item) => item.value)
                : [60]),
              20,
            )}
            stepValue={10}
            hideYAxisText={false}
            yAxisTextStyle={{
              color: GreyColors.grey400,
              fontSize: 12,
              fontWeight: '400',
            }}
            xAxisLabelTexts={chartData.map((item) => item.label)}
            hideAxesAndRules={false}
            xAxisColor={GreyColors.grey900}
            xAxisThickness={1}
            xAxisNoOfSections={0}
            xAxisLabelTextStyle={{
              color: GreyColors.grey600,
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center',
              width: 40,
              position: 'relative',
              right: 5,
            }}
            xAxisLabelsVerticalShift={10}
            yAxisColor={'transparent'}
            xAxisType={'solid'}
            hideRules={false}
            rulesColor={GreyColors.grey200}
            rulesType='dashed'
            rulesThickness={2}
            dashWidth={3}
            dashGap={3}
            showVerticalLines={true}
            verticalLinesColor={PrimaryColors.blue100}
            verticalLinesStrokeDashArray={[3, 3]}
            verticalLinesThickness={2}
            verticalLinesUptoDataPoint={true}
            hideOrigin={true}
            spacing={dynamicSpacing}
            initialSpacing={20}
            endSpacing={10}
            animationDuration={1200}
            areaChart
            startFillColor='#84BFF3'
            endFillColor='#E5F1FF'
            startOpacity={0.7}
            endOpacity={0.1}
            gradientDirection='vertical'
            curved
            disableScroll
            focusEnabled={false}
          />
          {chartData.length === 0 && (
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
    flex: 1,
    height: 240,
    paddingHorizontal: 10,
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
