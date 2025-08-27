import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors } from '@/constants/Colors';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  initialText: string;
  isRefresh?: boolean;
};

const RandomMessage = ({ initialText, isRefresh = false }: Props) => {
  const [text, setText] = useState(initialText);

  const handleRefresh = (): void => {
    // TODO : 랜덤 메시지 로직
    setText(text);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{text}</CustomText>
      {isRefresh && (
        <Pressable onPress={handleRefresh}>
          <View style={styles.icon}>
            <Icon name='refresh' color={GreyColors.grey500} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default RandomMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingVertical: 6,
    fontSize: 13,
    color: GreyColors.grey500,
    lineHeight: 19.5,
  },
  icon: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
