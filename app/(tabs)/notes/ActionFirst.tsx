import CTAButton from '@/components/button/CTAButton';
import RoundButton from '@/components/button/RoundButton';
import CategoryChip from '@/components/chip/CategoryChip';
import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { useActionTemplatesQuery } from '@/components/notes/hooks/useActionTemplatesQuery';
import { PrimaryColors } from '@/constants/Colors';
import { NoteValue, useNoteCreateStore } from '@/store/noteCreate.store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

const EMPTY_ACTION_TEXT = '                                         ';

const ActionFirst = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(0);
  const [selectedItem, setSelectedItem] = useState<NoteValue | null>(null);
  const { emotion, setSituationAction } = useNoteCreateStore();
  const { data, isLoading, isError } = useActionTemplatesQuery({
    emotionType: emotion?.emotionType ?? 'positive',
  });

  const handleSelectAction = ({
    id,
    text,
  }: {
    id: number;
    text: string;
  }): void => {
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    } else {
      setSelectedItem({ id, text });
    }
  };

  const handleSubmit = (): void => {
    setSituationAction(selectedItem);
    router.navigate('/notes/ActionSecond');
  };

  if (isLoading) {
    return null;
  }
  if (isError || !data) {
    return null;
  }

  const currentCategory = data[selectedType] ?? [];

  // 현재 카테고리의 액션 배열
  const actions = currentCategory?.actions ?? [];

  return (
    <SafeScreenLayout
      header={
        <NoteCreateHeaderLayout progressPrecentage={33}>
          <View style={styles.selectItemContainer}>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              룸메님이
            </CustomText>
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
        <NoteCreateGuide
          leftText='상황1.'
          rightText='룸메가 어떤 행동을 했나요?'
        />
        <View style={styles.actionTypeContainer}>
          {data.map(({ name }, index) => (
            <Pressable key={index} onPress={() => setSelectedType(index)}>
              <CategoryChip text={name} selected={selectedType === index} />
            </Pressable>
          ))}
        </View>
        <ScrollView
          style={styles.actionContainer}
          contentContainerStyle={{ rowGap: 12 }}
        >
          {actions.map(({ id, text }, index) => (
            <RoundButton
              key={id}
              text={text}
              active={selectedItem?.id === id}
              onPress={() => handleSelectAction({ id, text })}
            />
          ))}
        </ScrollView>
        <View style={styles.ctaContainer}>
          <CTAButton
            style={styles.ctaButton}
            text='이전'
            onPress={() => router.navigate('/notes/feeling')}
          />
          <CTAButton
            style={styles.ctaButton}
            text='다음'
            active
            onPress={handleSubmit}
            disabled={!selectedItem}
          />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default ActionFirst;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  selectItemContainer: {
    gap: 2,
  },

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

  actionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingTop: 8,
    paddingBottom: 10,
  },
  actionContainer: {
    paddingTop: 10,
  },
  ctaContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    width: '100%',
    marginTop: 'auto',
    gap: 17,
  },
  ctaButton: { flex: 1 },
});
