import { PrimaryColors } from '@/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

type ProgressBarProps = {
  percentage?: number; // 0~100
};

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, percentage));
  const target = clamped / 100;

  const anim = useRef(new Animated.Value(target)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: clamp01(target),
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // width를 애니메이션하므로 false
    }).start();
  }, [target, anim]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={styles.track}
      accessibilityRole='progressbar'
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
    >
      <Animated.View style={[styles.bar, { width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 6,
    borderRadius: 8,
    backgroundColor: '#A5D3FC',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: PrimaryColors.blue100,
  },
});

export default ProgressBar;
