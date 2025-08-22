/**
 * Design System Typography
 * Based on the provided design system specification
 * Using Pretendard font family
 */

// Font sizes in pixels - matching Figma design values directly

// Export typography scale for reference
export const TypographySizes = {
  head1: 23,
  head2: 21,
  head3: 19,
  body1: 17,
  body2: 15,
  body3: 13,
  body4: 11,
} as const;

export type FontWeight = 'bold' | 'semibold' | 'medium';

export const FontWeightToFamily = {
  bold: 'Pretendard-Bold',
  semibold: 'Pretendard-SemiBold',
  medium: 'Pretendard-Medium',
} as const;

// Font weights mapping
export const FontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Typography Scale with Pretendard font
export const Typography = {
  // Headings
  head1: {
    fontSize: 23,
    lineHeight: 23 * 1.4, // 140%
    fontFamily: 'Pretendard-Bold',
  },
  head2: {
    fontSize: 21,
    lineHeight: 21 * 1.45, // 145%
    fontFamily: 'Pretendard-SemiBold',
  },
  head3: {
    fontSize: 19,
    lineHeight: 19 * 1.45, // 145%
    fontFamily: 'Pretendard-Medium',
  },

  body1: {
    fontSize: 17,
    lineHeight: 17 * 1.5, // 150%
    fontFamily: 'Pretendard',
  },
  body2: {
    fontSize: 15,
    lineHeight: 15 * 1.6, // 160%
    fontFamily: 'Pretendard',
  },
  body3: {
    fontSize: 13,
    lineHeight: 13 * 1.5, // 150%
    fontFamily: 'Pretendard',
  },
  body4: {
    fontSize: 11,
    lineHeight: 16.5, // 150% as specified in design
    fontFamily: 'Pretendard',
    fontWeight: '500',
  },
} as const;

// Typography variants for different use cases
export const TypographyVariants = {
  // Display text (large headings)
  display: Typography.head1,

  // Section headings
  section: Typography.head2,

  // Subsection headings
  subsection: Typography.head3,

  // Primary body text
  primary: Typography.body1,

  // Secondary body text
  secondary: Typography.body2,

  // Small text (captions, labels)
  small: Typography.body3,

  // Extra small text (footnotes, metadata)
  extraSmall: Typography.body4,
} as const;

// Helper function to create typography with specific weight
export const createTypographyWithWeight = (
  weight: keyof typeof FontWeights,
) => ({
  head1: { ...Typography.head1, fontWeight: FontWeights[weight] },
  head2: { ...Typography.head2, fontWeight: FontWeights[weight] },
  head3: { ...Typography.head3, fontWeight: FontWeights[weight] },
  body1: { ...Typography.body1, fontWeight: FontWeights[weight] },
  body2: { ...Typography.body2, fontWeight: FontWeights[weight] },
  body3: { ...Typography.body3, fontWeight: FontWeights[weight] },
  body4: { ...Typography.body4, fontWeight: FontWeights[weight] },
});

// Helper function to create typography with specific color
export const createTypographyWithColor = (color: string) => ({
  head1: { ...Typography.head1, color },
  head2: { ...Typography.head2, color },
  head3: { ...Typography.head3, color },
  body1: { ...Typography.body1, color },
  body2: { ...Typography.body2, color },
  body3: { ...Typography.body3, color },
  body4: { ...Typography.body4, color },
});
