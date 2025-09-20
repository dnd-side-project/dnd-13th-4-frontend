// components/modal/AppModal.tsx
import { GreyColors } from '@/constants/Colors';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import CTAButton from '../button/CTAButton';
import { CustomText } from '../CustomText';

type AppModalProps = {
  visible: boolean;
  title?: string;
  description?: string;
  /** 확인 버튼 텍스트/핸들러 */
  confirmText?: string;
  onConfirm?: () => void;
  /** 취소 버튼(옵션) */
  cancelText?: string;
  onCancel?: () => void;
  /** 바깥 클릭으로 닫기 */
  closeOnBackdropPress?: boolean;
  /** 커스텀 내용 (description 대신 children 렌더) */
  children?: React.ReactNode;
};

export default function AppModal({
  visible,
  title = '알림',
  description,
  confirmText = '확인',
  onConfirm,
  cancelText,
  onCancel,
  closeOnBackdropPress = true,
  children,
}: AppModalProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          damping: 14,
          stiffness: 140,
          mass: 0.8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 120,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start();
      scale.setValue(0.98);
    }
  }, [visible, opacity, scale]);

  const handleBackdrop = () => {
    if (!closeOnBackdropPress) return;
    onCancel?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
      statusBarTranslucent
      onRequestClose={onCancel} // 안드로이드 백버튼
    >
      <View style={styles.root}>
        {/* Backdrop */}
        <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdrop}>
          <Animated.View style={[styles.backdrop, { opacity }]} />
        </Pressable>

        {/* Card */}
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          {title && (
            <CustomText
              variant='body1'
              color='#000000'
              fontWeight='bold'
              style={styles.title}
            >
              {title}
            </CustomText>
          )}

          {children ? (
            <View style={styles.content}>{children}</View>
          ) : !!description ? (
            <CustomText
              variant='body3'
              color={GreyColors.grey500}
              style={styles.description}
            >
              {description}
            </CustomText>
          ) : null}

          <View style={styles.footer}>
            {cancelText && <CTAButton onPress={onCancel} text={cancelText} />}
            <CTAButton onPress={onConfirm} text={confirmText} active />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  card: {
    width: 270,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    // Android elevation
    elevation: 8,
  },
  title: { textAlign: 'center' },
  content: { marginTop: 10, alignItems: 'center' },
  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    gap: 10,
    flexDirection: 'column', // 버튼 세로 스택 (스크린샷 느낌)
  },
});
