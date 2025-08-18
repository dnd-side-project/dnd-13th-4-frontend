import CTAButton from '@/components/button/CTAButton';
import RoundButton from '@/components/button/RoundButton';
import CategoryChip from '@/components/chip/CategoryChip';
import { CustomText } from '@/components/CustomText';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

const Action = () => {
  return (
    <View style={styles.container}>
      <NoteCreateHeaderLayout progressPrecentage={33}>
        <View style={styles.selectItemContainer}>
          <CustomText color={PrimaryColors.blue100} variant='head3'>
            룸메님이
          </CustomText>
          <View style={styles.selectItemBox}>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              큰 소리로 노래했어요
            </CustomText>
          </View>
        </View>
      </NoteCreateHeaderLayout>
      <NoteCreateGuide
        leftText='상황1.'
        rightText='룸메가 어떤 행동을 했나요?'
      />
      <View style={styles.actionTypeContainer}>
        <CategoryChip text='📣 소음' selected />
        <CategoryChip text='🫧 위생' />
        <CategoryChip text='🧺 집안일' />
        <CategoryChip text='📦 기타' />
      </View>
      <View style={styles.actionContainer}>
        <RoundButton text='큰 소리로 노래했어요' />
        <RoundButton text='기상 알람을 안 껐어요' />
        <RoundButton text='미디어 볼륨을 너무 높였어요' />
        <RoundButton text='통화 중 너무 크게 말했어요' />
        <RoundButton text='생활 소음이 너무 크게 냈어요' />
      </View>
      <View style={styles.ctaContainer}>
        <CTAButton text='이전' />
        <CTAButton text='다음' active />
      </View>
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  selectItemContainer: {
    gap: 2,
  },

  selectItemBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PrimaryColors.blue200,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  actionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  actionContainer: { paddingTop: 10, paddingHorizontal: 20, gap: 12 },
  ctaContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
  },
});
