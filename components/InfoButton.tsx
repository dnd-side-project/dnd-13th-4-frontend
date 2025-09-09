import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './CustomText';

interface InfoButtonProps {
  tooltipText: string;
  position?: 'top' | 'bottom';
  iconSize?: number;
  iconColor?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const InfoButton: React.FC<InfoButtonProps> = ({
  tooltipText,
  position = 'top',
  iconSize = 16,
  iconColor = 'white',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handlePress = (event: any) => {
    // 버튼의 위치 측정
    event.target.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setButtonPosition({ x: pageX, y: pageY });
        setIsVisible(true);
      },
    );
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const getTooltipStyle = () => {
    const tooltipWidth = Math.min(320, SCREEN_WIDTH - 40);
    const tooltipHeight = 80; // 대략적인 높이

    let left = buttonPosition.x - tooltipWidth / 2 + iconSize / 2;
    let top =
      position === 'top'
        ? buttonPosition.y - tooltipHeight - 10
        : buttonPosition.y + iconSize + 10;

    // 화면 경계 체크
    if (left < 20) left = 20;
    if (left + tooltipWidth > SCREEN_WIDTH - 20) {
      left = SCREEN_WIDTH - tooltipWidth - 20;
    }

    return {
      position: 'absolute' as const,
      left,
      top,
      width: tooltipWidth,
    };
  };

  return (
    <>
      <Pressable onPress={handlePress} style={styles.iconButton}>
        <Icon name='info' size={iconSize} color={iconColor} />
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType='fade'
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View style={[styles.tooltip, getTooltipStyle()]}>
            <View style={styles.tooltipContent}>
              <Pressable onPress={handleClose} style={styles.closeButton}>
                <Icon name='close' size={20} color={GreyColors.grey600} />
              </Pressable>

              <CustomText
                variant='body3'
                color={PrimaryColors.blueText}
                fontWeight='medium'
                style={styles.tooltipText}
              >
                {tooltipText}
              </CustomText>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tooltip: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tooltipContent: {
    padding: 16,
    paddingRight: 40,
  },
  tooltipTail: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  tooltipTailTop: {
    top: -8,
    borderBottomWidth: 8,
    borderBottomColor: 'white',
  },
  tooltipTailBottom: {
    bottom: -8,
    borderTopWidth: 8,
    borderTopColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    zIndex: 1,
  },
  tooltipText: {
    lineHeight: 20,
  },
});
