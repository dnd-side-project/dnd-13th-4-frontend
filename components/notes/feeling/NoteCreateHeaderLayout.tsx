import ProgressBar from '@/components/bar/ProgressBar';
import { CustomText } from '@/components/CustomText';
import Header from '@/components/header/Header';
import { PrimaryColors } from '@/constants/Colors';
import { useNoteCreateStore } from '@/store/noteCreate.store';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  children?: ReactNode;
  progressPrecentage?: number;
};

const NoteCreateHeaderLayout = ({
  children,
  progressPrecentage = 0,
}: Props) => {
  const { getPreview } = useNoteCreateStore();
  const previewData = getPreview();

  return (
    <LinearGradient
      colors={['#C1DEFF', '#F5FAFF']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={styles.container}
    >
      <Header text='마음쪽지 생성' />
      <View style={styles.progressBarContainer}>
        <ProgressBar percentage={progressPrecentage} />
      </View>
      <View style={styles.summaryContainer}>
        {previewData.map((item) => (
          <View key={item} style={styles.summary}>
            <CustomText variant='body3' color={PrimaryColors.blue100}>
              {item}
            </CustomText>
          </View>
        ))}
      </View>
      <View>{children}</View>
    </LinearGradient>
  );
};

export default NoteCreateHeaderLayout;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 16 },
  progressBarContainer: { paddingBottom: 8 },
  summaryContainer: { flexDirection: 'row', gap: 8, paddingBottom: 12 },
  summary: {
    borderRadius: 8,
    backgroundColor: PrimaryColors.blue300,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});
