import ToastBar from '@/components/bar/ToastBar';
import CTAButton from '@/components/button/CTAButton';
import LongSquareButton from '@/components/button/LongSquareButton';
import RoundButton from '@/components/button/RoundButton';
import SquareButton from '@/components/button/SquareButton';
import StatusButton from '@/components/button/StatusButton';
import Header from '@/components/header/Header';
import { StyleSheet, View } from 'react-native';

const UiTest = () => {
  return (
    <View style={styles.container}>
      <Header text='마음쪽지 생성' />
      <RoundButton text='큰 소리로 노래했어요' />
      <RoundButton text='큰 소리로 노래했어요' active />

      <SquareButton text='중요한 회의 중' />
      <SquareButton text='중요한 회의 중' active />

      <LongSquareButton text='편하게 이야기 나눠보고 싶어요🌼' active />
      <LongSquareButton text='편하게 이야기 나눠보고 싶어요🌼' />

      <StatusButton text='30분 후' />
      <StatusButton text='30분 후' active />

      <CTAButton text='이전' />
      <CTAButton text='다음' active />
      <CTAButton text='다음' active disabled />

      <ToastBar text='마음쪽지를 보관함에 저장했어요' />
    </View>
  );
};

export default UiTest;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    display: 'flex',
    gap: 4,
  },
});
