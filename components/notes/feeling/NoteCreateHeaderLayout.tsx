import ProgressBar from '@/components/bar/ProgressBar';
import { CustomText } from '@/components/CustomText';
import Header from '@/components/header/Header';
import { PrimaryColors } from '@/constants/Colors';
import { useNoteCreateStore } from '@/store/noteCreate.store';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  children?: ReactNode;
  progressPrecentage?: number;
  style?: ViewStyle;
};

const NoteCreateHeaderLayout = ({
  children,
  style,
  progressPrecentage = 0,
}: Props) => {
  const { getPreview } = useNoteCreateStore();
  const previewData = getPreview();

  return (
    <View style={[styles.container, style]}>
      <Header text='마음쪽지 생성' />
      <View style={styles.progressBarContainer}>
        <ProgressBar percentage={progressPrecentage} />
      </View>
      <View style={styles.summaryContainer}>
        {previewData.map((item) => (
          <View key={item} style={styles.summary}>
            <CustomText
              fontWeight='medium'
              variant='body3'
              color={PrimaryColors.blue100}
            >
              {item}
            </CustomText>
          </View>
        ))}
      </View>
      <View>{children}</View>
    </View>
  );
};

export default NoteCreateHeaderLayout;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 16 },
  progressBarContainer: { paddingBottom: 8 },
  summaryContainer: { flexDirection: 'row', gap: 8, paddingBottom: 12 },
  summary: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: PrimaryColors.blue300,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});
