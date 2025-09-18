import ProgressBar from '@/components/bar/ProgressBar';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import StarPhysics from '@/components/statistics/StarPhysics';
import { Tooltip } from '@/components/ui/Tooltip';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
import useWeeklyLogSummaryQuery from '@/hooks/api/useWeeklyLogSummaryQuery';
import { calculateDaysSince } from '@/utils/time';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useIsMatched } from '../mypage/hooks/useMeQuery';

const MAX_ONE_WEEK_NOTES_COUNT = 42;

interface BottleSectionProps {
  refreshKey: number;
  onRefresh: () => void;
}

export default function BottleSection({
  refreshKey,
  onRefresh,
}: BottleSectionProps) {
  const { data } = useWeeklyLogSummaryQuery();
  const totalNotesThisWeek =
    data.notesReceivedThisWeek + data.notesSentThisWeek;

  const isMatched = useIsMatched();

  return (
    <>
      <CustomText
        variant='head1'
        color={GreyColors.grey800}
        fontWeight='bold'
        style={styles.headerMessage}
      >
        {isMatched
          ? `지금까지 총 ${data.totalNotesExchanged}개의\n마음을 주고 받았어요`
          : `아직 마음쪽지를\n주고받지 않았어요`}
      </CustomText>
      <View style={styles.container}>
        <Image
          source={{
            uri: `${S3_IMAGE_URL}/statistics/big_bottle.png`,
          }}
          style={styles.bottleImage}
        />
        <TouchableOpacity
          onPress={onRefresh}
          style={styles.starPhysicsContainer}
        >
          <StarPhysics
            key={refreshKey}
            width={220}
            height={240}
            starCount={totalNotesThisWeek}
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
            {totalNotesThisWeek} / {MAX_ONE_WEEK_NOTES_COUNT}개
          </CustomText>
          <Tooltip
            position='top'
            content={
              <CustomText variant='body3' color={GreyColors.grey600}>
                {`7일간(월~일) 하루 3개씩 룸메와 서로 보낼 수 있으므로\n이번 주에 최대 42개의 마음쪽지를 쌓을 수 있어요.`}
              </CustomText>
            }
          >
            <Icon name={'info'} size={16} color='white' />
          </Tooltip>
        </View>
        <ProgressBar
          percentage={Math.round(
            (totalNotesThisWeek / MAX_ONE_WEEK_NOTES_COUNT) * 100,
          )}
          backgroundColor='white'
        />
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
              {data.notesReceivedThisWeek}개
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
              {data.notesSentThisWeek}개
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
              {calculateDaysSince(data.roomJoinedAt)}일째
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerMessage: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 25,
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
