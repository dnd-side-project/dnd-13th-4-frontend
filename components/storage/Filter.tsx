import { GreyColors } from '@/constants/Colors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';
import { Icon } from '../icons';

type SortOption = 'latest' | 'oldest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest', label: '최신 순' },
  { value: 'oldest', label: '오래된 순' },
];

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SortOption>('latest');

  const label = SORT_OPTIONS.find((opt) => opt.value === selected)?.label;

  const handleSelect = (item: SortOption): void => {
    setIsOpen(false);
    setSelected(item);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <CustomText variant='body3' color={GreyColors.grey600}>
          {label}
        </CustomText>
        <View style={styles.iconContainer}>
          <Icon
            style={isOpen ? styles.chevronOpen : styles.chevron}
            name='expandLeft'
            color={GreyColors.grey600}
            size={16}
          />
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.dropdown}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => handleSelect(option.value)}
              style={styles.dropdownItem}
            >
              <CustomText variant='body3' color={GreyColors.grey600}>
                {option.label}
              </CustomText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {},
  button: { flexDirection: 'row', alignItems: 'center' },
  chevron: { transform: [{ rotate: '-90deg' }] },
  chevronOpen: { transform: [{ rotate: '90deg' }] },
  iconContainer: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 42,
    right: 0,
    minWidth: 100,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GreyColors.grey200,

    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
