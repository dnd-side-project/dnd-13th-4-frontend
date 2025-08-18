import CTAButton from '@/components/button/CTAButton';
import RoundButton from '@/components/button/RoundButton';
import CategoryChip from '@/components/chip/CategoryChip';
import { CustomText } from '@/components/CustomText';
import { ACTION_LIST } from '@/components/notes/constants/actions';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { PrimaryColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

const EMPTY_ACTION_TEXT = '                                         ';

const ActionFirst = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(
    ACTION_LIST.negative[0].label,
  );
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // 현재 선택된 label(type)에 해당하는 카테고리 찾기
  const currentCategory = useMemo(() => {
    const categories = [...ACTION_LIST.negative, ...ACTION_LIST.positive];
    return categories.find((c) => c.label === selectedType) ?? null;
  }, [selectedType]);

  // 현재 카테고리의 액션 배열
  const actions = currentCategory?.actions ?? [];

  const handleSelectAction = (newAction: string) => {
    if (selectedAction === newAction) {
      setSelectedAction(null);
    } else {
      setSelectedAction(newAction);
    }
  };

  return (
    <View style={styles.container}>
      <NoteCreateHeaderLayout progressPrecentage={33}>
        <View style={styles.selectItemContainer}>
          <CustomText color={PrimaryColors.blue100} variant='head3'>
            룸메님이
          </CustomText>
          <View style={styles.selectItemBox}>
            <CustomText color={PrimaryColors.blue100} variant='head3'>
              {selectedAction ?? EMPTY_ACTION_TEXT}
            </CustomText>
          </View>
        </View>
      </NoteCreateHeaderLayout>
      <View style={styles.contentContainer}>
        <NoteCreateGuide
          leftText='상황1.'
          rightText='룸메가 어떤 행동을 했나요?'
        />
        <View style={styles.actionTypeContainer}>
          {ACTION_LIST.negative.map(({ label }) => (
            <Pressable key={label} onPress={() => setSelectedType(label)}>
              <CategoryChip text={label} selected={selectedType === label} />
            </Pressable>
          ))}
        </View>
        <ScrollView
          style={styles.actionContainer}
          contentContainerStyle={{ rowGap: 12 }}
        >
          {actions.map((action, index) => (
            <RoundButton
              key={action}
              text={action}
              active={selectedAction === action}
              onPress={() => handleSelectAction(action)}
            />
          ))}
        </ScrollView>
        <View style={styles.ctaContainer}>
          <CTAButton
            style={{ flex: 1 }}
            text='이전'
            onPress={() => router.push('/notes/feeling')}
          />
          <CTAButton
            style={{ flex: 1 }}
            text='다음'
            active
            onPress={() => router.push('/notes/action-second')}
            disabled={!selectedAction}
          />
        </View>
      </View>
    </View>
  );
};

export default ActionFirst;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', paddingBottom: 16 },

  selectItemContainer: {
    gap: 2,
  },

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
});
