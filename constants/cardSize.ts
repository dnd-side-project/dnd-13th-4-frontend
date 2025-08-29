import { Dimensions } from 'react-native';

// 카드 기본 크기
export const MIN_CARD_WIDTH = 105;
export const MIN_CARD_HEIGHT = 130;
export const CARD_ASPECT_RATIO = MIN_CARD_WIDTH / MIN_CARD_HEIGHT;

// 레이아웃 상수
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const HORIZONTAL_PADDING = 48; // 양쪽 24px씩
export const GAP_TOTAL = 24; // 12px * 2 (간격)
export const MAX_CARDS = 3;

// 계산된 크기
export const AVAILABLE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING - GAP_TOTAL;
export const CALCULATED_CARD_WIDTH = AVAILABLE_WIDTH / MAX_CARDS;
export const CARD_WIDTH = Math.max(MIN_CARD_WIDTH, CALCULATED_CARD_WIDTH);
export const CARD_HEIGHT = Math.max(MIN_CARD_HEIGHT, CARD_WIDTH / CARD_ASPECT_RATIO);