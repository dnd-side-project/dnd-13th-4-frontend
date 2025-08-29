import CTAButton from '@/components/button/CTAButton';
import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import MindLetter from '@/components/read-mind-letter/MindLetter';
import { S3_IMAGE_URL } from '@/constants';
import { GreyColors } from '@/constants/Colors';
import useSaveNoteMutation from '@/hooks/api/useSaveNoteMutation';
import { toast } from '@/store/toast.store';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// 별 컴포넌트 - 수직 위아래 반복 움직임과 클릭시 위로 올라가기
const FloatingStar = ({ onFlash }: { onFlash: () => void }) => {
  const translateY = useRef(new Animated.Value(10)).current;
  const [isClicked, setIsClicked] = useState(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (!isClicked) {
      // 수직 위아래 반복 애니메이션
      const verticalAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -10, // 위로 10px
            duration: 1500, // 1.5초
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 10, // 아래로 10px
            duration: 1500, // 1.5초
            useNativeDriver: true,
          }),
        ]),
      );

      animationRef.current = verticalAnimation;
      verticalAnimation.start();

      return () => {
        verticalAnimation.stop();
      };
    }
  }, [isClicked]);

  const handleStarPress = () => {
    setIsClicked(true);

    if (animationRef.current) {
      animationRef.current.stop();
    }

    setTimeout(() => {
      const flyAwayAnimation = Animated.timing(translateY, {
        toValue: -height - 200,
        duration: 1000,
        useNativeDriver: true,
      });

      animationRef.current = flyAwayAnimation;

      onFlash();

      flyAwayAnimation.start((finished) => {
        animationRef.current = null;
      });
    }, 50);
  };

  return (
    <TouchableOpacity onPress={handleStarPress} disabled={isClicked}>
      <Animated.View
        style={[
          styles.star,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={{
            uri: `${S3_IMAGE_URL}/statistics/uncomfortable_star.png`,
          }}
          style={{ width: 40, height: 40 }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function ReadMindLetter() {
  const jarWidth = 150; // 화면 너비의 60%
  const jarHeight = 200;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const [showJarMessage, setShowJarMessage] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate } = useSaveNoteMutation();

  const handleFlash = () => {
    // 플래시 효과: 투명 -> 완전 불투명 -> 투명
    Animated.sequence([
      Animated.timing(flashOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(flashOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setShowJarMessage(true);
      }
    });

    // 플래시 효과 중간에 유리병 메시지로 교체 (화면이 완전히 하얘진 순간)
    setTimeout(() => {
      setShowJarMessage(true);
    }, 1000);
  };

  const handleSave = (): void => {
    mutate(Number(id));
    router.push('/');
    toast.show('마음쪽지를 보관함에 저장했어요');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={{
          uri: `${S3_IMAGE_URL}/create_letter_sample_+background.png`,
        }}
        style={styles.backgroundImage}
      />

      {/* 헤더 */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name='close' size={24} color={GreyColors.grey600} />
        </Pressable>
        <CustomText
          variant='body1'
          color={GreyColors.grey700}
          fontWeight='medium'
          style={styles.headerTitle}
        >
          받은 마음쪽지
        </CustomText>
        <View style={styles.placeholder} />
      </View>

      {/* 메인 컨텐츠 */}
      <View style={styles.content}>
        <CustomText
          variant='head1'
          color={GreyColors.grey800}
          fontWeight='bold'
          style={styles.title}
        >
          {!showJarMessage ? (
            <>유리병 속 별종이를 눌러{'\n'}마음쪽지를 확인하세요</>
          ) : (
            <>룸메이트가 보낸{'\n'}마음을 확인해 보세요</>
          )}
        </CustomText>

        {/* 유리병 컨테이너 또는 메시지 */}
        <View style={styles.jarContainer}>
          {!showJarMessage ? (
            <>
              {/* 유리병 이미지 */}
              <Image
                source={{
                  uri: `${S3_IMAGE_URL}/statistics/small_bottle.png`,
                }}
                style={[
                  styles.jarImage,
                  {
                    width: jarWidth,
                    height: jarHeight,
                  },
                ]}
              />

              {/* 유리병 안의 플로팅 별 */}
              <View
                style={[
                  styles.starsContainer,
                  { width: jarWidth, height: jarHeight },
                ]}
              >
                <FloatingStar onFlash={handleFlash} />
              </View>
            </>
          ) : (
            <View>
              <MindLetter noteId={Number(id)} />
            </View>
          )}
        </View>
      </View>

      {/* 플래시 오버레이 */}
      <Animated.View
        style={[
          styles.flashOverlay,
          {
            opacity: flashOpacity,
          },
        ]}
        pointerEvents='none'
      />
      {showJarMessage && (
        <View style={styles.buttonContainer}>
          <CTAButton onPress={handleSave} text='보관함에 저장하기' active />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    display: 'flex',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    resizeMode: 'cover',
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // backButton과 같은 크기로 중앙 정렬
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    textAlign: 'center',
  },
  jarContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jarImage: {
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
  },
  starsContainer: {
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    elevation: 20, // Android용
    transform: [{ rotate: '15deg' }],
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  messageTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  messageText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
