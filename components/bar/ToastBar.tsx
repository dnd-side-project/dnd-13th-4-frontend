import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';
import { Icon, IconName } from '../icons';

type Props = {
  text: string;
  iconName?: IconName;
  style?: StyleProp<ViewStyle>;
};

const ToastBar = ({ iconName = 'messageFill', text, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.icon}>
        <Icon name={iconName} color={PrimaryColors.blue100} size={16} />
      </View>
      <CustomText variant='body2' fontWeight='semibold' color='#FFFFFF'>
        {text}
      </CustomText>
    </View>
  );
};

export default ToastBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GreyColors.grey800,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  icon: {
    backgroundColor: PrimaryColors.blue300,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
});
