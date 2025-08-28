import { CustomText } from '@/components/CustomText';
import { GreyColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

type NoteBadgeProps = {
  text: string;
};

const NoteBadge = ({ text }: NoteBadgeProps) => {
  return (
    <View style={styles.badge}>
      <CustomText style={styles.badgeText}>{text}</CustomText>
    </View>
  );
};

export default NoteBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: GreyColors.grey100,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    color: GreyColors.grey600,
  },
});
