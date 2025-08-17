import { CustomText } from '@/components/CustomText';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { Pressable, StyleSheet, View } from 'react-native';

interface MyStatusSectionProps {
  onStatusPress: () => void;
}

export const MyStatusSection = ({ onStatusPress }: MyStatusSectionProps) => (
  <View style={styles.myStatus}>
    <View style={styles.myStatusText}>
      <CustomText
        variant='body2'
        style={{ fontWeight: 500, marginRight: 4 }}
      >
        나의 상태는
      </CustomText>
      <CustomText
        variant='body2'
        style={{ fontWeight: 700, marginRight: 8 }}
      >
        🚌 외출 중
      </CustomText>
      <View
        style={{
          paddingVertical: 1,
          paddingHorizontal: 6,
          borderRadius: 20,
          backgroundColor: '#E5F1FF',
        }}
      >
        <CustomText
          variant='body3'
          style={{ fontWeight: 700, color: PrimaryColors.blue100 }}
        >
          ~18:00
        </CustomText>
      </View>
    </View>
    <Pressable onPress={onStatusPress}>
      <CustomText
        variant='body3'
        style={{
          fontWeight: 500,
          textDecorationLine: 'underline',
          color: GreyColors.grey500,
          paddingVertical: 10,
          paddingHorizontal: 8,
        }}
      >
        나의 상태 설정
      </CustomText>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  myStatus: {
    height: 58,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: 'rgba(0, 1, 80, 1)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    backgroundColor: 'white',
  },
  myStatusText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});