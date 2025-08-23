import { GreyColors, PrimaryColors, SecondaryColors } from '@/constants/Colors';
import { FontWeights, Typography } from '@/constants/Typography';
import React from 'react';
import { Text, type TextProps } from 'react-native';

type TypographyVariant = keyof typeof Typography;

type ColorVariant =
  | keyof typeof PrimaryColors
  | keyof typeof SecondaryColors
  | keyof typeof GreyColors;

export interface CustomTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorVariant | string;
  fontWeight?: keyof typeof FontWeights;
  children: React.ReactNode;
}

const allColors = {
  ...PrimaryColors,
  ...SecondaryColors,
  ...GreyColors,
} as const;

export function CustomText({
  variant = 'body1',
  color = 'grey900',
  fontWeight,
  style,
  children,
  ...rest
}: CustomTextProps) {
  const typographyStyle = Typography[variant];

  const isPaletteKey =
    typeof color === 'string' &&
    Object.prototype.hasOwnProperty.call(allColors, color);

  const textColor = isPaletteKey
    ? allColors[color as keyof typeof allColors]
    : color;

  const fontWeightValue = fontWeight ? FontWeights[fontWeight] : undefined;

  return (
    <Text
      style={[
        typographyStyle,
        { color: textColor },
        fontWeightValue && { fontWeight: fontWeightValue },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
