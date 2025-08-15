import { CustomText } from '@/components/CustomText';
import { PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

const NoteBadge = () => {
  return (
    <View style={styles.badge}>
      <CustomText style={styles.badgeText}>상황</CustomText>
    </View>
  );
};

export default NoteBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: PrimaryColors.blue300,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    color: PrimaryColors.blue100,
    fontFamily: 'Pretendard-SemiBold',
  },
});
