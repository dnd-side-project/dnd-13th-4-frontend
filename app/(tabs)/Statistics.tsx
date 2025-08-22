import ProgressBar from '@/components/bar/ProgressBar';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import Header from '@/components/statistics/Header';
import StarPhysics from '@/components/statistics/StarPhysics';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export default function Statistics() {
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <SafeScreenLayout>
      {/* 배경 이미지 */}
      <Image
        source={{
          uri: `${S3_IMAGE_URL}/statistics/statistics_main_background.png`,
        }}
        style={styles.backgroundImage}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Header />
        <CustomText
          variant='head1'
          color={GreyColors.grey800}
          fontWeight='bold'
          style={styles.headerMessage}
        >
          지금까지 총 84개의{'\n'}마음을 주고 받았어요
        </CustomText>
        <View style={styles.bottleContainer}>
          <Image
            source={{
              uri: `${S3_IMAGE_URL}/statistics/big_bottle.png`,
            }}
            style={styles.bottleImage}
          />
          <TouchableOpacity
            onPress={handleRefresh}
            style={styles.starPhysicsContainer}
          >
            <StarPhysics
              key={refreshKey}
              width={220}
              height={240}
              starCount={42}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <CustomText variant='body2' color='white' fontWeight='medium'>
              이번주
            </CustomText>
            <CustomText
              variant='body2'
              color='white'
              fontWeight='medium'
              style={{ flex: 1, textAlign: 'right', marginRight: 4 }}
            >
              19 / 42개
            </CustomText>
            <Icon name={'info'} size={16} color='white' />
          </View>
          <ProgressBar percentage={45} backgroundColor='white' />
          <View
            style={{
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
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                paddingVertical: 4,
              }}
            >
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
            <View
              style={{
                width: 1,
                height: '100%',
                backgroundColor: GreyColors.grey200,
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                paddingVertical: 4,
              }}
            >
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
            <View
              style={{
                width: 1,
                height: '100%',
                backgroundColor: GreyColors.grey200,
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                paddingVertical: 4,
              }}
            >
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

        <View style={styles.contentArea}>
          <View style={styles.growthArea}>
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
                style={{ marginBottom: 20 }}
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
          <View style={styles.myKeywordArea}>
            <View style={styles.areaTitle}>
              <CustomText
                variant='body1'
                fontWeight='bold'
                color={GreyColors.grey800}
              >
                나를 대표하는 키워드
              </CustomText>
              <Icon name='info' size={16} color={GreyColors.grey400} />
            </View>
            <CustomText
              variant='body2'
              color={GreyColors.grey600}
              fontWeight='medium'
              style={styles.areaSubtitle}
            >
              최근 30일 기준으로 선정했어요
            </CustomText>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
              <View style={styles.myKeywordWrapper}>
                <CustomText variant='body2' style={styles.categoryTitle}>
                  {`많이 받은\n칭찬 카테고리`}
                </CustomText>
                <CustomText
                  variant='body2'
                  fontWeight='medium'
                  color={PrimaryColors.blue100}
                  style={styles.categoryEmoji}
                >
                  🤝
                </CustomText>
                <View
                  style={{
                    borderRadius: 8,
                    backgroundColor: PrimaryColors.blue300,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                >
                  <CustomText
                    variant='body2'
                    fontWeight='medium'
                    color={PrimaryColors.blue100}
                    style={{ textAlign: 'center' }}
                  >
                    배려
                  </CustomText>
                </View>
              </View>
              <View style={styles.myKeywordWrapper}>
                <CustomText variant='body2' style={styles.categoryTitle}>
                  {`많이 받은\n불만 카테고리`}
                </CustomText>
                <CustomText
                  variant='body2'
                  fontWeight='medium'
                  color={PrimaryColors.blue100}
                  style={styles.categoryEmoji}
                >
                  🧺
                </CustomText>
                <View
                  style={{
                    borderRadius: 8,
                    backgroundColor: PrimaryColors.blue300,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}
                >
                  <CustomText
                    variant='body2'
                    fontWeight='medium'
                    color={PrimaryColors.blue100}
                    style={{ textAlign: 'center' }}
                  >
                    집안일
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreenLayout>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    zIndex: -1,
  },
  scrollContainer: {
    paddingTop: 44,
    flex: 1,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  headerMessage: {
    textAlign: 'center',
    marginBottom: 25,
  },
  bottleContainer: {
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
    top: 95, // 병 안쪽에 위치하도록 조정
  },
  contentArea: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  myKeywordArea: {
    backgroundColor: 'white',
    paddingVertical: 24,
  },
  myKeywordWrapper: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: GreyColors.grey50,
  },
  growthArea: {
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
  categoryTitle: {
    color: GreyColors.grey800,
    fontWeight: 600,
  },
  categoryEmoji: {
    marginTop: 6,
    marginBottom: 16,
    fontSize: 25,
    fontWeight: 700,
    lineHeight: 35,
    textAlign: 'center',
  },
  categoryStandard: {
    color: GreyColors.grey400,
    fontWeight: 500,
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
    elevation: 3, // Android용
  },
  growthKeywordWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
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
    elevation: 3, // Android용
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
});
