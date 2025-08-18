import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import FromToText from '@/components/notes/submit/FromToText';
import NoteCard from '@/components/notes/submit/NoteCard';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Submit = () => {
  const [cardWidth, setCardWidth] = useState(0);

  return (
    <ImageBackground
      source={{
        uri: 'https://wiinii-bucket.s3.ap-northeast-2.amazonaws.com/images/create_letter_sample_+background.png',
      }} // TODO : 개발환경에서 깜빡임 발생함. 최적화 필요함.
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Icon
          style={styles.backIcon}
          color={GreyColors.grey600}
          size={30}
          name='expandLeft'
        />
        <CustomText
          style={styles.headerText}
          color={GreyColors.grey700}
          variant='body1'
        >
          마음쪽지 생성
        </CustomText>
        <View style={{ width: 30 }} />
      </View>
      <View style={{ paddingTop: 24, paddingBottom: 40 }}>
        <FromToText />
      </View>
      <View style={{ position: 'relative' }}>
        <NoteCard
          style={{ zIndex: 100 }}
          cardWidth={cardWidth}
          changeCardWidth={(newCardWidth) => setCardWidth(newCardWidth)}
        />
        <View style={[styles.backgroundCard, { width: cardWidth - 17 }]} />
      </View>
      <View style={styles.buttonContainer}>
        <CTAButton
          style={{ alignSelf: 'flex-end' }}
          text='마음쪽지 보내기'
          active
        />
      </View>
    </ImageBackground>
  );
};

export default Submit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  backgroundCard: {
    position: 'absolute',
    width: 290,
    height: 401,
    borderRadius: 20,
    backgroundColor: PrimaryColors.blue100,
    left: '50%',
    transform: [{ translateX: -145 }, { rotate: '9deg' }],
    top: 7,
    zIndex: 10,
  },
});
