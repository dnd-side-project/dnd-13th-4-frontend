import { CustomText } from '@/components/CustomText';
import DashedBottomLine from '@/components/DashedBottomLine';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import NoteBadge from './NoteBadge';

type Props = {
  topText: string;
  bottomText: string;
};

const SituationText = ({ topText, bottomText }: Props) => {
  return (
    <View style={styles.situationContainer}>
      <NoteBadge text='상황' />
      <View style={styles.textContainer}>
        <View>
          <CustomText variant='body2' color={GreyColors.grey700}>
            룸메님이{' '}
            <CustomText
              style={{ fontFamily: 'Pretendard-Bold' }}
              variant='body2'
              color={PrimaryColors.blueText}
            >
              {topText}
            </CustomText>
          </CustomText>
          <DashedBottomLine />
        </View>
        {bottomText && (
          <View style={{ width: '100%' }}>
            <CustomText variant='body2' color={GreyColors.grey700}>
              그때 저는{' '}
              <CustomText
                style={{ fontFamily: 'Pretendard-Bold' }}
                variant='body2'
                color={PrimaryColors.blueText}
              >
                {bottomText}
              </CustomText>
              이었어요
            </CustomText>
            <DashedBottomLine />
          </View>
        )}
      </View>
    </View>
  );
};

export default SituationText;

const styles = StyleSheet.create({
  situationContainer: {
    gap: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
});
