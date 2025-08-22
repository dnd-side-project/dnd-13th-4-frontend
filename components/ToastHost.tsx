import { useToastStore } from '@/store/toast.store';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToastBar from './bar/ToastBar';

const ENTER_MS = 200;
const EXIT_MS = 160;

type Props = {
  /** 부모에서 absolute 등 포지셔닝/간격을 전부 제어 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 연속 표시 시 각 토스트 사이 간격 (여러 개 쌓일 수 있게 확장 여지) */
  gap?: number;
};

export default function ToastHost({ containerStyle, gap = 8 }: Props) {
  const { queue, current, setCurrent, shift } = useToastStore();
  const [visible, setVisible] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const timer = useRef<NodeJS.Timeout | null>(null);

  const insets = useSafeAreaInsets();

  // 큐 소비
  useEffect(() => {
    if (!current && queue.length > 0) setCurrent(queue[0]);
  }, [queue, current, setCurrent]);

  // 표시/오토닫힘
  useEffect(() => {
    if (!current) return;

    setVisible(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ENTER_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: ENTER_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(hide, current.duration);

    return () => {
      timer.current && clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: EXIT_MS,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 10,
        duration: EXIT_MS,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      useToastStore.getState().setCurrent(null);
      useToastStore.getState().shift();
    });
  };

  if (!current) return null;

  return (
    <View
      pointerEvents='box-none'
      style={[styles.absoluteContainer, containerStyle]}
    >
      <Animated.View
        style={{
          opacity,
          transform: [{ translateY }],
          marginTop: insets.top + gap, // status bar + safe area
          marginBottom: gap,
          alignSelf: 'stretch',
          marginHorizontal: 20,
        }}
      >
        <ToastBar
          text={current.message}
          iconName={(current as any).iconName ?? 'messageFill'}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center', // 중앙 정렬
    zIndex: 9999, // 맨 위로
  },
});
