import { useNoteCreateStore } from '@/app/store/note-create.store';
import CTAButton from '@/components/button/CTAButton';
import LongSquareButton from '@/components/button/LongSquareButton';
import { CustomText } from '@/components/CustomText';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { PROMISE_LIST } from '@/components/notes/constants/promises';
import NoteCreateGuide from '@/components/notes/feeling/NoteCreateGuide';
import NoteCreateHeaderLayout from '@/components/notes/feeling/NoteCreateHeaderLayout';
import { PrimaryColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

const EMPTY_ACTION_TEXT =
  '                                                       ';

const Promise = () => {
  const router = useRouter();
  const { promise, setPromise } = useNoteCreateStore();

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
      setPromise(null);
    } else {
      setPromise({ text, id });
    }
  };

  return (
    <SafeScreenLayout
      header={
        <NoteCreateHeaderLayout progressPrecentage={100}>
          <View style={styles.selectItemContainer}>
            <CustomText variant='head3'> </CustomText>
            <View style={styles.selectItemSecondRow}>
              <View style={styles.selectItemBox}>
                <CustomText color={PrimaryColors.blue100} variant='head3'>
                  {promise?.text ?? EMPTY_ACTION_TEXT}
                </CustomText>
              </View>
            </View>
          </View>
        </NoteCreateHeaderLayout>
      }
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
                handleSelect({ id, isActive: id === promise?.id, text })
              }
              active={id === promise?.id}
            />
          ))}
        </ScrollView>
        <View style={styles.ctaContainer}>
          <CTAButton
            onPress={() => router.navigate('/notes/action-second')}
            style={styles.ctaButton}
            text='이전'
          />
          <CTAButton
            onPress={() => router.navigate('/notes/submit')}
            style={styles.ctaButton}
            text='다음'
            active
            disabled={!promise}
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
