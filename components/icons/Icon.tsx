import React from 'react';
import { View, ViewStyle } from 'react-native';
import { iconComponents, IconName, IconProps } from './iconComponents';

interface IconComponentProps extends IconProps {
  name: IconName;
  style?: ViewStyle;
}

export const Icon = ({ name, style, ...props }: IconComponentProps) => {
  const IconComponent = iconComponents[name];
  return (
    <View style={style}>
      <IconComponent {...props} />
    </View>
  );
};
