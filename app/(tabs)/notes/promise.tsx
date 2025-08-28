import CTAButton from '@/components/button/CTAButton';
import LongSquareButton from '@/components/button/LongSquareButton';
import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { PROMISE_LIST } from '@/components/notes/constants/promises';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { usePromiseTemplatesQuery } from '@/components/notes/hooks/usePromiseTemplatesQuery';
import { PrimaryColors } from '@/constants/Colors';
import { NoteValue, useNoteCreateStore } from '@/store/noteCreate.store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const EMPTY_ACTION_TEXT =
  '                                                       ';

const Promise = () => {
  const router = useRouter();
  const { emotion, setPromise } = useNoteCreateStore();
  const [selectedItem, setSelectedItem] = useState<NoteValue | null>(null);

  const { data, isLoading, isError } = usePromiseTemplatesQuery({
    emotionType: emotion?.emotionType ?? 'positive',
  });

  const handleSelect = ({
    id,
    text,
    isActive,
  }: {
    id: number;
    text: string;
    isActive: boolean;
  }): void => {
    if (isActive) {
      setSelectedItem(null);
    } else {
      setSelectedItem({ text, id });
    }
  };

  const handleSubmit = (): void => {
    setPromise(selectedItem);
    router.navigate('/notes/submit');

    // TODO : 마음쪽지가 제출 되기 이전에 페이지가 언마운트 되게 만들어야함.
    // 지금은 언마운트가 되지않아 강제로 상태를 초기화
    setSelectedItem(null);
  };

  if (isLoading) {
    return null;
  }
  if (isError || !data) {
    return null;
  }

  return (
    <SafeScreenLayout
      header={
        <NoteCreateHeaderLayout progressPrecentage={100}>
          <View style={styles.selectItemContainer}>
            <CustomText variant='head3'> </CustomText>
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
            </View>
          </View>
        </NoteCreateHeaderLayout>
      }
      background={{
        type: 'gradient',
        colors: ['#F5FAFF', '#C1DEFF'],
        locations: [0, 0.4],
      }}
      childrenStyle={{ backgroundColor: '#ffffff' }}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.guideContainer}>
          <NoteCreateGuide
            leftText='약속.'
            rightText='앞으로 어떻게 하면 좋을까요?'
          />
        </View>
        <ScrollView
          contentContainerStyle={{ rowGap: 12 }}
          style={styles.listContainer}
        >
          {PROMISE_LIST.map(({ id, text }) => (
            <LongSquareButton
              key={id}
              text={text}
              onPress={() =>
                handleSelect({ id, isActive: id === selectedItem?.id, text })
              }
              active={id === selectedItem?.id}
            />
          ))}
        </ScrollView>
        <View style={styles.ctaContainer}>
          <CTAButton
            onPress={() => router.navigate('/notes/ActionSecond')}
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

export default Promise;

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

  listContainer: {
    paddingTop: 37,
    gap: 12,
  },

  ctaContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 'auto',
    gap: 17,
  },
  ctaButton: { flex: 1 },
});
