import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
import useWeeklyLogSummaryQuery from '@/hooks/api/useWeeklyLogSummaryQuery';
import { calculateDaysSince } from '@/utils/time';
import { router } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { useIsMatched } from '../mypage/hooks/useMeQuery';

const HOME_STATISTICS_BACKGROUND_IMAGE = `${S3_IMAGE_URL}/home/home_statistics.png`;

export default function StatisticsSummary() {
  const isMatched = useIsMatched();
  const { data } = useWeeklyLogSummaryQuery();

  return (
    <ImageBackground
      source={{ uri: HOME_STATISTICS_BACKGROUND_IMAGE }}
      style={styles.ourLog}
      resizeMode='cover'
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <CustomText variant='body1' color='white' fontWeight='bold'>
          지난 우리의 로그
        </CustomText>
        <Pressable
          onPress={() => router.push('/(tabs)/Statistics')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: -8,
          }}
        >
          <CustomText variant='body3' color={'white'}>
            자세히 보기
          </CustomText>
          <Icon
            name='expandLeft'
            size={20}
            color='white'
            style={{
              transform: [{ rotate: '180deg' }],
            }}
          />
        </Pressable>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <CustomText variant='body3' color={GreyColors.grey500}>
            이번 주 받은쪽지
          </CustomText>
          <CustomText
            variant='body3'
            fontWeight='semibold'
            color={isMatched ? GreyColors.grey800 : GreyColors.grey600}
          >
            {isMatched ? data.notesReceivedThisWeek : 0}개
          </CustomText>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <CustomText variant='body3' color={GreyColors.grey500}>
            이번 주 보낸쪽지
          </CustomText>
          <CustomText
            variant='body3'
            fontWeight='semibold'
            color={isMatched ? GreyColors.grey800 : GreyColors.grey600}
          >
            {isMatched ? data.notesSentThisWeek : 0}개
          </CustomText>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <CustomText variant='body3' color={GreyColors.grey500}>
            마음을 나눈지
          </CustomText>
          <CustomText
            variant='body3'
            fontWeight='semibold'
            color={isMatched ? GreyColors.grey800 : GreyColors.grey600}
          >
            {isMatched ? calculateDaysSince(data.roomJoinedAt) : 0}일째
          </CustomText>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ourLog: {
    padding: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
  },
});
