import { CustomText } from '@/components/CustomText';
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
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: {},

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
});
