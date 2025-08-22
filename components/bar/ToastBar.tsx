import { PrimaryColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from '../icons';

type Props = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

const ToastBar = ({ text, style }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name='messageFill' size={20} />
      </View>
    </View>
  );
};

export default ToastBar;

const styles = StyleSheet.create({
  container: {},
  icon: {
    backgroundColor: PrimaryColors.blue300,
    borderRadius: 999,
  },
});
