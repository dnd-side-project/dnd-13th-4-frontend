import CTAButton from '@/components/button/CTAButton';
import SquareButton from '@/components/button/SquareButton';
import { CustomText } from '@/components/CustomText';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { PrimaryColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const EMPTY_ACTION_TEXT = '                               ';

const ActionSecond = () => {
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <NoteCreateHeaderLayout progressPrecentage={66}>
        <View style={styles.selectItemContainer}>
          <CustomText color={PrimaryColors.blue100} variant='head3'>
            그때 저는
          </CustomText>
          <View style={styles.selectItemSecondRow}>
            <View style={styles.selectItemBox}>
              <CustomText color={PrimaryColors.blue100} variant='head3'>
                {selectedAction ?? EMPTY_ACTION_TEXT}
              </CustomText>
            </View>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              이었어요.
            </CustomText>
          </View>
        </View>
      </NoteCreateHeaderLayout>
      <View style={styles.contentContainer}>
        <NoteCreateGuide leftText='상황2.' rightText='당시 어떤 상태였나요?' />
        <View style={styles.grid}>
          <SquareButton style={styles.gridItem} text='중요한 업무 중' />
          <SquareButton style={styles.gridItem} text='쿨쿨 자는 중' />
          <SquareButton style={styles.gridItem} text='열심히 공부 중' />
          <SquareButton style={styles.gridItem} text='편하게 쉬는 중' />
          <SquareButton style={styles.gridItem} text='맛있는 식사 중' />
        </View>
        <View style={styles.ctaContainer}>
          <CTAButton
            style={{ flex: 1 }}
            text='이전'
            onPress={() => router.push('/notes/action-first')}
          />
          <CTAButton
            style={{ flex: 1 }}
            text='다음'
            active
            disabled={!selectedAction}
          />
        </View>
      </View>
    </View>
  );
};

export default ActionSecond;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  selectItemContainer: {
    gap: 2,
  },
  selectItemSecondRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  selectItemBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PrimaryColors.blue200,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem: {
    width: '48.5%', // 50% 대신 gap 고려해서 줄임
    marginBottom: 12, // 행 사이 간격
    justifyContent: 'center',
    alignItems: 'center',
  },

  ctaContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 'auto',
    gap: 17,
  },
});
