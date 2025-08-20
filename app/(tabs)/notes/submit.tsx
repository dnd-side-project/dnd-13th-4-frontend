import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import FromToText from '@/components/notes/submit/FromToText';
import NoteCard from '@/components/notes/submit/NoteCard';
import { GreyColors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const BACKGROUND_IMAGE =
  'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/create_letter_sample_+background.png';

const Submit = () => {
  const router = useRouter();

  return (
    <SafeScreenLayout
      background={{
        type: 'image',
        uri: BACKGROUND_IMAGE,
      }} // TODO : 개발환경에서 깜빡임 발생함. 최적화 필요함.
      style={styles.container}
      header={
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole='button'
            accessibilityLabel='뒤로 가기'
          >
            <Icon
              style={styles.backIcon}
              color={GreyColors.grey600}
              size={30}
              name='expandLeft'
            />
          </Pressable>
          <CustomText
            style={styles.headerText}
            color={GreyColors.grey700}
            variant='body1'
          >
            마음쪽지 생성
          </CustomText>
          <View style={{ width: 30 }} />
        </View>
      }
    >
      <View style={styles.contentContainer}>
        <View style={{ paddingTop: 24, paddingBottom: '10%' }}>
          <FromToText />
        </View>
        <View style={{ position: 'relative' }}>
          <NoteCard style={{ zIndex: 100 }} />
        </View>
        <View style={styles.buttonContainer}>
          <CTAButton
            style={{ alignSelf: 'flex-end' }}
            text='마음쪽지 보내기'
            active
          />
        </View>
      </View>
    </SafeScreenLayout>
  );
};

export default Submit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 16,
    flex: 1,
  },
  backIcon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {},
  buttonContainer: {
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
});
