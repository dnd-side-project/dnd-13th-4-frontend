import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors, PrimaryColors } from '@/constants/Colors';
import useMyKeywordQuery from '@/hooks/api/useMyKeywordQuery';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function KeywordSection() {
  const { data } = useMyKeywordQuery();

  const isMatched = process.env.EXPO_PUBLIC_IS_MATCHED === 'true';

  return (
    <View style={styles.container}>
      <View style={styles.areaTitle}>
        <CustomText
          variant='body1'
          fontWeight='bold'
          color={GreyColors.grey800}
        >
          나를 대표하는 키워드
        </CustomText>
        <Icon name='info' size={16} color={GreyColors.grey400} />
      </View>
      <CustomText
        variant='body2'
        color={GreyColors.grey600}
        fontWeight='medium'
        style={styles.areaSubtitle}
      >
        최근 많이 받은 데이터를 보여줘요
      </CustomText>
      <View style={styles.keywordContainer}>
        <View style={styles.keywordWrapper}>
          <CustomText variant='body2' style={styles.categoryTitle}>
            {`많이 받은\n칭찬 카테고리`}
          </CustomText>
          <CustomText
            variant='body2'
            fontWeight='medium'
            color={PrimaryColors.blue100}
            style={styles.categoryEmoji}
          >
            {isMatched ? '🤝' : ''}
          </CustomText>
          <View style={styles.keywordBadge}>
            <CustomText
              variant='body2'
              fontWeight='medium'
              color={PrimaryColors.blue100}
              style={styles.keywordText}
            >
              {' '}
              {isMatched ? '배려 ' : '--'}
            </CustomText>
          </View>
        </View>
        <View style={styles.keywordWrapper}>
          <CustomText variant='body2' style={styles.categoryTitle}>
            {`많이 받은\n불만 카테고리`}
          </CustomText>
          <CustomText
            variant='body2'
            fontWeight='medium'
            color={PrimaryColors.blue100}
            style={styles.categoryEmoji}
          >
            {isMatched ? '🤝' : ''}
          </CustomText>
          <View style={styles.keywordBadge}>
            <CustomText
              variant='body2'
              fontWeight='medium'
              color={PrimaryColors.blue100}
              style={styles.keywordText}
            >
              {isMatched ? '집안일' : '--'}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 24,
  },
  areaTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 4,
  },
  areaSubtitle: {
    marginBottom: 12,
  },
  keywordContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  keywordWrapper: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: GreyColors.grey50,
  },
  categoryTitle: {
    color: GreyColors.grey800,
    fontWeight: '600',
  },
  categoryEmoji: {
    marginTop: 6,
    marginBottom: 16,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'center',
  },
  keywordBadge: {
    borderRadius: 8,
    backgroundColor: PrimaryColors.blue300,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  keywordText: {
    textAlign: 'center',
  },
});
