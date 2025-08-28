import { CustomText } from '@/components/CustomText';
import FlexibleButton from '@/components/button/FlexibleButton';
import { Icon } from '@/components/icons';
import { SafeScreenLayout } from '@/components/layout/SafeScreenLayout';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import CarouselUi, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type OnboardingData = {
  text: React.ReactNode;
  backgroundImage: string;
};

const onboardingData: OnboardingData[] = [
  {
    text: (
      <CustomText
        variant='head3'
        color={GreyColors.grey800}
        fontWeight='bold'
        style={styles.centerText}
      >
        {`룸메이트와 솔직하게 대화하고 싶지만,\n관계가 어긋날까봐 망설인 적 있나요?`}
      </CustomText>
    ),
    backgroundImage: 'onboarding_1.png',
  },
  {
    text: (
      <CustomText
        variant='head3'
        color={GreyColors.grey800}
        fontWeight='bold'
        style={styles.centerText}
      >
        <CustomText
          variant='head3'
          color={PrimaryColors.blue100}
          fontWeight='bold'
        >
          Wini
        </CustomText>
        는 룸메이트와 마음을 쉽게 주고받아,{'\n'}서로를 잘 이해하도록 도와드려요
      </CustomText>
    ),
    backgroundImage: 'onboarding_2.png',
  },
  {
    text: (
      <CustomText
        variant='head3'
        color={GreyColors.grey800}
        fontWeight='bold'
        style={styles.centerText}
      >
        {`쪽지템플릿을 통해 복잡한 고민을 덜고,\n정돈된 글로 마음을 전해보세요`}
      </CustomText>
    ),
    backgroundImage: 'onboarding_3.png',
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const isLastSlide = currentIndex === onboardingData.length - 1;

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      // TODO: 실제 카카오 로그인 구현 후 메인 페이지로 이동
      router.replace('/(tabs)');
    } else {
      carouselRef.current?.next();
    }
  }, [isLastSlide]);

  const handleSkip = useCallback(() => {
    const lastIndex = onboardingData.length - 1;
    setCurrentIndex(lastIndex);
    carouselRef.current?.scrollTo({
      index: lastIndex,
      animated: true,
    });
  }, []);

  const renderOnboardingSlide = (item: OnboardingData) => {
    return (
      <View style={styles.slide}>
        <ImageBackground
          source={{ uri: `${S3_IMAGE_URL}/onboarding/${item.backgroundImage}` }}
          style={styles.backgroundContainer}
          resizeMode='stretch'
        >
          <View style={styles.contentContainer}>{item.text}</View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <SafeScreenLayout style={styles.container}>
      <View style={styles.carouselContainer}>
        <CarouselUi
          ref={carouselRef}
          data={onboardingData}
          height={screenHeight}
          width={screenWidth}
          onSnapToItem={setCurrentIndex}
          onProgressChange={progress}
          renderItem={({ item }) => renderOnboardingSlide(item)}
          scrollAnimationDuration={300}
          pagingEnabled={false}
          snapEnabled={false}
          loop={false}
          enabled={false}
        />
      </View>

      {!isLastSlide && (
        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <CustomText variant='body2' color={PrimaryColors.blue100}>
            SKIP
          </CustomText>
        </Pressable>
      )}

      <View style={styles.bottomContainer}>
        <Pagination.Custom
          progress={progress}
          data={onboardingData}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.paginationContainer}
        />

        {isLastSlide ? (
          <FlexibleButton
            onPress={handleNext}
            style={styles.kakaoButton}
          >
            <View
              style={styles.kakaoButtonContent}
            >
              <Icon name='kakao' size={18} />
              <CustomText variant='body1' color='#000000' fontWeight='bold'>
                카카오 로그인
              </CustomText>
            </View>
          </FlexibleButton>
        ) : (
          <FlexibleButton onPress={handleNext}>
            <CustomText variant='body1' color='#ffffff' fontWeight='bold'>
              다음
            </CustomText>
          </FlexibleButton>
        )}
      </View>
    </SafeScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PrimaryColors.blue100,
  },
  slide: {
    width: screenWidth,
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    marginTop: 144,
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  carouselContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  centerText: {
    textAlign: 'center',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    bottom: 38,
    width: '100%',
    gap: 20,
  },
  dot: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 8,
    height: 8,
  },
  activeDot: {
    backgroundColor: PrimaryColors.blue100,
    borderRadius: 50,
    width: 15,
    height: 15,
  },
  paginationContainer: {
    gap: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default OnboardingScreen;
