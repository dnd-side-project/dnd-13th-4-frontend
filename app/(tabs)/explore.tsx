import { ScrollView, StyleSheet, View } from 'react-native';
import { CustomText } from '@/components/CustomText';
import { PrimaryColors, SecondaryColors, GreyColors } from '@/constants/Colors';

const ColorBlock = ({ color, name }: { color: string; name: string }) => (
  <View style={styles.colorItem}>
    <View style={[styles.colorSwatch, { backgroundColor: color }]} />
    <View style={styles.colorInfo}>
      <CustomText variant="body2" color="grey900">{name}</CustomText>
      <CustomText variant="body3" color="grey600">{color}</CustomText>
    </View>
  </View>
);

export default function ColorsScreen() {
  const primaryEntries = Object.entries(PrimaryColors);
  const secondaryEntries = Object.entries(SecondaryColors);
  const greyEntries = Object.entries(GreyColors);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText variant="head1" color="blue200" style={styles.title}>
          Colors Showcase
        </CustomText>
        
        <View style={styles.section}>
          <CustomText variant="head3" color="grey800" style={styles.sectionTitle}>
            Primary Colors
          </CustomText>
          {primaryEntries.map(([name, color]) => (
            <ColorBlock key={name} color={color} name={name} />
          ))}
        </View>

        <View style={styles.section}>
          <CustomText variant="head3" color="grey800" style={styles.sectionTitle}>
            Secondary Colors
          </CustomText>
          {secondaryEntries.map(([name, color]) => (
            <ColorBlock key={name} color={color} name={name} />
          ))}
        </View>

        <View style={styles.section}>
          <CustomText variant="head3" color="grey800" style={styles.sectionTitle}>
            Grey Scale
          </CustomText>
          {greyEntries.map(([name, color]) => (
            <ColorBlock key={name} color={color} name={name} />
          ))}
        </View>
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
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorInfo: {
    flex: 1,
  },
});
