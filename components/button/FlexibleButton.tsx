import { PrimaryColors } from '@/constants/Colors';
import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const FlexibleButton = ({
  children,
  active = true,
  onPress,
  style,
  disabled = false,
}: Props) => {
  return (
    <Pressable
      style={[
        styles.button,
        active ? styles.active : styles.unActive,
        disabled ? styles.disabled : null,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active, disabled }}
    >
      {children}
    </Pressable>
  );
};

export default FlexibleButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    paddingVertical: 16,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: PrimaryColors.blue100,
  },
  unActive: {
    backgroundColor: '#ffffff',
  },
  disabled: {
    opacity: 0.5,
  },
});
