import { GreyColors } from '@/constants/Colors';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  backgroundColor = 'white',
  position = 'bottom',
}) => {
  const [visible, setVisible] = useState(false);
  const tooltipLeftRef = useRef(-((SCREEN_WIDTH - 40) / 2 - 10));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const showTooltip = () => {
    setVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideTooltip = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  };

  const handleLayout = (event: any) => {
    const { x, width } = event.nativeEvent.layout;
    const iconCenter = x + width / 2;
    const tooltipWidth = SCREEN_WIDTH - 48;
    const screenCenter = SCREEN_WIDTH / 2 - 16;
    tooltipLeftRef.current = screenCenter - tooltipWidth / 2 - iconCenter;
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <TouchableOpacity onPress={showTooltip}>{children}</TouchableOpacity>

      {visible && (
        <>
          <Pressable style={styles.overlay} onPress={hideTooltip} />
          <Animated.View
            style={[
              styles.tooltip,
              position === 'top' ? styles.tooltipTop : styles.tooltipBottom,
              {
                backgroundColor,
                left: tooltipLeftRef.current,
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={{ flex: 1, paddingRight: 24 }}>{content}</View>
            <Pressable onPress={hideTooltip} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 1,
  },
  tooltip: {
    position: 'absolute',
    left: -((SCREEN_WIDTH - 32) / 2 - 8),
    width: SCREEN_WIDTH - 40,
    padding: 16,
    borderRadius: 12,
    zIndex: 2,
    minHeight: 60,
    borderWidth: 1,
    borderColor: GreyColors.grey400,
  },
  tooltipTop: {
    bottom: 25,
  },
  tooltipBottom: {
    top: 25,
  },
  closeButton: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GreyColors.grey600,
  },
});
