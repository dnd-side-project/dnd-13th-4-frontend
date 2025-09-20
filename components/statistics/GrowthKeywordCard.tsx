import { CustomText } from '@/components/CustomText';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

interface GrowthKeywordCardProps {
  title: string;
  actionText?: string;
  changeAmount?: number;
  isMatched: boolean;
  isPositive?: boolean;
}

export default function GrowthKeywordCard({
  title,
  actionText,
  changeAmount,
  isMatched,
  isPositive = true,
}: GrowthKeywordCardProps) {
  const changePrefix = isPositive ? '+' : '-';
  const changeValue = isPositive ? changeAmount : Math.abs(changeAmount || 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText
          variant='body2'
          color={GreyColors.grey800}
          fontWeight='semibold'
        >
          {title}
        </CustomText>
        {(!!actionText && !!changeAmount) ?? (
          <CustomText variant='body2' color={PrimaryColors.blue100}>
            {isMatched ? '데이터를 수집중이에요' : '--'}
          </CustomText>
        )}
      </View>
      {isMatched && actionText && (
        <View style={styles.content}>
          <CustomText
            variant='body2'
            color={PrimaryColors.blue100}
            fontWeight='medium'
          >
            {actionText || '데이터 없음'}
          </CustomText>
          <CustomText
            variant='body2'
            color={PrimaryColors.blue100}
            fontWeight='medium'
            style={styles.changeAmount}
          >
            {changePrefix}
            {changeValue}회
          </CustomText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
  },
  changeAmount: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: PrimaryColors.blue300,
  },
});
