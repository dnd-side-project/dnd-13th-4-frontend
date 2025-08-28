import CTAButton from '@/components/button/CTAButton';
import SquareButton from '@/components/button/SquareButton';
import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { MY_STATE_LIST } from '@/components/notes/constants/actions';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { PrimaryColors } from '@/constants/Colors';
import { NoteValue, useNoteCreateStore } from '@/store/noteCreate.store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const EMPTY_ACTION_TEXT = '                               ';

const ActionSecond = () => {
  const router = useRouter();
  const { setSituationState } = useNoteCreateStore();
  const [selectedItem, setSelectedItem] = useState<NoteValue | null>(null);

  const handleSelect = ({
    text,
    id,
    isActive,
  }: {
    text: string;
    id: number;
    isActive: boolean;
  }) => {
    if (isActive) {
      setSelectedItem(null);
    } else {
      setSelectedItem({ text, id });
    }
  };

  const handleSkip = (): void => {
    router.navigate('/notes/promise');
  };

  const handleSubmit = (): void => {
    setSituationState(selectedItem);
    router.navigate('/notes/promise');
  };

  return (
    <SafeScreenLayout
      header={
        <NoteCreateHeaderLayout progressPrecentage={66}>
          <View style={styles.selectItemContainer}>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              그때 저는
            </CustomText>
            <View style={styles.selectItemSecondRow}>
              <View style={styles.selectItemBox}>
                <CustomText
                  fontWeight='semibold'
                  color={PrimaryColors.blue100}
                  variant='head3'
                >
                  {selectedItem?.text ?? EMPTY_ACTION_TEXT}
                </CustomText>
              </View>
              <CustomText color={PrimaryColors.blue100} variant='head3'>
                이었어요.
              </CustomText>
            </View>
          </View>
        </NoteCreateHeaderLayout>
      }
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.guideContainer}>
          <NoteCreateGuide
            leftText='상황2.'
            rightText='당시 어떤 상태였나요?'
          />
          <Pressable onPress={handleSkip}>
            <CustomText style={styles.skip} color={PrimaryColors.blue100}>
              SKIP
            </CustomText>
          </Pressable>
        </View>
        <View style={styles.grid}>
          {MY_STATE_LIST.map(({ text, id }) => (
            <SquareButton
              key={id}
              style={styles.gridItem}
              text={text}
              onPress={() =>
                handleSelect({ id, text, isActive: id === selectedItem?.id })
              }
              active={id === selectedItem?.id}
              fullWidth={false}
            />
          ))}
        </View>
        <View style={styles.ctaContainer}>
          <CTAButton
            onPress={() => router.navigate('/notes/ActionFirst')}
            style={styles.ctaButton}
            text='이전'
          />
          <CTAButton
            onPress={handleSubmit}
            style={styles.ctaButton}
            text='다음'
            active
            disabled={!selectedItem}
          />
        </View>
      </View>
    </SafeScreenLayout>
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
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 16,
  },

  guideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  skip: { paddingHorizontal: 20, textDecorationLine: 'underline' },

  grid: {
    paddingTop: 44,
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
  ctaButton: { flex: 1 },
});
