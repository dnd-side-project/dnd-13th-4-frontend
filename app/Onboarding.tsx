import KakaoLoginButton from '@/components/button/KakaoLoginButton';
import { Image } from 'expo-image';
import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    title:
      '룸메이트와 솔직히 대화하고 싶지만,\n관계가 어긋날까봐 망설인 적 있나요?',
    backgroundImage: '/onboarding/onboarding_1.png',
  },
  {
    title:
      'Wini는 룸메이트와 마음을 쉽게 주고받아,\n서로를 잘 이해하도록 도와드려요',
    backgroundImage: '/onboarding/onboarding_2.png',
  },
  {
    title:
      '쪽지템플릿을 통해 복잡한 고민을 덜고,\n정돈된 글로 마음을 전해보세요',
    backgroundImage: '/onboarding/onboarding_3.png',
  },
];

export default function OnBoarding() {
  const progressValue = useSharedValue(0);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.header}>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Text style={styles.headerText}>마음쪽지 생성</Text>
          <TouchableOpacity>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Image
            source={{ uri: item.backgroundImage }}
            style={styles.backgroundImage}
            contentFit='cover'
          />

          <View style={styles.contentOverlay}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.pagination}>
              {onboardingData.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === index && styles.activeDot]}
                />
              ))}
            </View>

            {index === onboardingData.length - 1 ? (
              <TouchableOpacity
                style={[
                  styles.button,
                  index === onboardingData.length - 1 && styles.finalButton,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    index === onboardingData.length - 1 &&
                      styles.finalButtonText,
                  ]}
                >
                  다음
                </Text>
              </TouchableOpacity>
            ) : (
              <KakaoLoginButton />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={height}
        data={onboardingData}
        scrollAnimationDuration={500}
        renderItem={renderItem}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  slideContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  skipText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#007AFF',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  contentOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 60,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
  },
  finalButton: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  finalButtonText: {
    color: '#333',
  },
});
