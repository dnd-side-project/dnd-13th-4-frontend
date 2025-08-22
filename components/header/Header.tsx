import { GreyColors } from '@/constants/Colors';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomText } from '../CustomText';
import { Icon, IconName } from '../icons';

type Props = {
  text: string;
  style?: StyleProp<ViewStyle>;
  leftIconName?: IconName;
};

const Header = ({ text, style, leftIconName }: Props) => {
  return (
    <View style={[style, styles.container]}>
      {leftIconName ? (
        <Icon
          style={styles.backIcon}
          color={GreyColors.grey600}
          size={30}
          name={leftIconName}
        />
      ) : (
        <View style={{ width: 30 }} />
      )}
      <CustomText
        style={styles.headerText}
        color={GreyColors.grey700}
        variant='body1'
      >
        {text}
      </CustomText>
      <View style={{ width: 30 }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backIcon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {},
});
