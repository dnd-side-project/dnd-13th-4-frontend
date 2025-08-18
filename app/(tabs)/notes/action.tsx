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
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
