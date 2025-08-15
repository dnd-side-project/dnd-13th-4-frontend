import { CustomText } from '@/components/CustomText';
import { Typography } from '@/constants/Typography';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function TypographyScreen() {
  const typographyKeys = Object.keys(Typography) as (keyof typeof Typography)[];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText variant='head1' color='blue200' style={styles.title}>
          Typography Showcase
        </CustomText>
        {typographyKeys.map((variant) => (
          <View key={variant} style={styles.section}>
            <CustomText variant='body3' color='grey600' style={styles.label}>
              {variant} - {Typography[variant].fontSize}px /{' '}
              {Typography[variant].fontWeight}
            </CustomText>
            <CustomText variant={variant} style={styles.sample}>
              The quick brown fox jumps over the lazy dog
            </CustomText>
            <CustomText variant={variant} color='blue100' style={styles.sample}>
              한글 타이포그래피 테스트입니다
            </CustomText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    marginBottom: 8,
  },
  sample: {
    marginBottom: 4,
  },
});
