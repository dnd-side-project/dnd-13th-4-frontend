import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';
import { Icon } from '../icons';

type Props = {
  text: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showIcon?: boolean;
};

const SquareButton = ({
  active = false,
  text,
  onPress,
  style,
  showIcon = true,
}: Props) => {
  return (
    <Pressable
      style={[style, styles.button, active ? styles.active : styles.unActive]}
      onPress={onPress}
      accessibilityRole='button'
      accessibilityState={{ selected: active }}
    >
      <CustomText
        variant='body2'
        fontWeight={active ? 'bold' : 'medium'}
        style={
          (active ? styles.active : styles.unActive,
          { flex: 1, textAlign: 'center' })
        }
        color={active ? PrimaryColors.blue100 : GreyColors.grey800}
      >
        {text}
      </CustomText>
      {showIcon && (
        <Icon
          name='checkFill'
          size={24}
          color={active ? PrimaryColors.blue100 : '#CCD2E3'}
        />
      )}
    </Pressable>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
  },
  active: {
    backgroundColor: PrimaryColors.blue300,
    borderColor: PrimaryColors.blue100,
  },
  unActive: {
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: GreyColors.grey100,
  },
});
