import ProgressBar from '@/components/bar/ProgressBar';
import { CustomText } from '@/components/CustomText';
import Header from '@/components/header/Header';
import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

type Props = {
  emotionLabel: string;
};

const NoteCreateFeelingHeader = ({ emotionLabel }: Props) => {
  return (
    <LinearGradient
      colors={['#C1DEFF', '#F5FAFF']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={styles.container}
    >
      <Header text='마음쪽지 생성' />
      <View style={styles.progressBarContainer}>
        <ProgressBar />
      </View>
      <View style={styles.previewDescription}>
        <Icon size={15} name='altFill' color={GreyColors.grey500} />
        <CustomText variant='body3' color={GreyColors.grey500}>
          룸메에게 보낼 내용 미리보기
        </CustomText>
      </View>
      <View style={styles.preview}>
        <View style={styles.feelingBox}>
          <CustomText color={PrimaryColors.blue100} variant='head3'>
            {emotionLabel}
          </CustomText>
        </View>
        <CustomText color={PrimaryColors.blue100} variant='head3'>
          마음을 전해요.
        </CustomText>
      </View>
    </LinearGradient>
  );
};

export default NoteCreateFeelingHeader;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 16 },
  progressBarContainer: {
    paddingBottom: 47,
  },
  previewDescription: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 6,
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feelingBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PrimaryColors.blue200,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
});
