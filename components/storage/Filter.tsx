import { GreyColors } from '@/constants/Colors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from '../CustomText';
import { Icon } from '../icons';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <CustomText variant='body3' color={GreyColors.grey600}>
          최신 순
        </CustomText>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.leftToDown}
            name='expandLeft'
            color={GreyColors.grey600}
            size={16}
          />
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.dropdown}>
          <CustomText>asd</CustomText>
        </View>
      )}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {},
  button: { flexDirection: 'row', alignItems: 'center' },
  leftToDown: { transform: [{ rotate: '-90deg' }] },
  iconContainer: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 28, // 트리거 아래로 약간
    right: 0, // 트리거 오른쪽 정렬
    minWidth: 140,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9EDF1',

    // box-shadow: 0 2px 20px 0 rgba(0,0,0,.05)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,

    zIndex: 100,
  },
});
