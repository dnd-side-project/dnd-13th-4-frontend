import { CustomText } from '@/components/CustomText';
import DashedBottomLine from '@/components/DashedBottomLine';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import NoteBadge from './NoteBadge';

const SituationText = () => {
  return (
    <View style={styles.situationContainer}>
      <NoteBadge />
      <View style={styles.textContainer}>
        <View>
          <CustomText variant='body2' color={GreyColors.grey700}>
            룸메님이{' '}
            <CustomText
              style={{ fontFamily: 'Pretendard-Bold' }}
              variant='body2'
              color={PrimaryColors.blueText}
            >
              큰소리로 노래했어요
            </CustomText>
          </CustomText>
          <DashedBottomLine />
        </View>
        <View>
          <CustomText variant='body2' color={GreyColors.grey700}>
            그때 저는{' '}
            <CustomText
              style={{ fontFamily: 'Pretendard-Bold' }}
              variant='body2'
              color={PrimaryColors.blueText}
            >
              중요한 업무중
            </CustomText>
            이었어요
          </CustomText>
          <DashedBottomLine />
        </View>
      </View>
    </View>
  );
};

export default SituationText;

const styles = StyleSheet.create({
  situationContainer: {
    display: 'flex',
    gap: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {},
});
