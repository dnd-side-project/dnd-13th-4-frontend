import { CustomText } from '@/components/CustomText';
import { Icon } from '@/components/icons';
import { GreyColors } from '@/constants/Colors';
import { getRandomItem } from '@/lib/getRandomItem';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  EmotionType,
  useClosingTemplatesQuery,
} from '../hooks/useClosingTemplatesQuery';

type Props = {
  initialText?: string;
  emotionType: EmotionType;
  isRefresh?: boolean;
};

const RandomMessage = ({
  initialText,
  emotionType,
  isRefresh = false,
}: Props) => {
  // 초기값은 initialText로 고정 세팅
  const [text, setText] = useState<string | undefined>(initialText);

  // isRefresh가 true일 때만 쿼리 활성화 (hook 내부에서 enabled 옵션 지원한다고 가정)
  const { data, isLoading, isError } = useClosingTemplatesQuery({
    emotionType,
    enabled: isRefresh,
  });
  console.log(data);

  const handleRefresh = (): void => {
    if (!data) return;

    let next = getRandomItem(data);
    // 같은 값 연속 방지(선택): 같은 값이면 한 번 더 시도
    if (next === text && data.length > 1) {
      next = getRandomItem(data);
    }

    setText(next?.text);
  };

  // 초기 랜덤 세팅: initialText가 없고, isRefresh=true이고, 데이터가 왔을 때 한 번만
  useEffect(() => {
    if (isRefresh && data) {
      const rnd = getRandomItem(data);
      if (rnd) setText(rnd.text);
    }
  }, [data, isRefresh]);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{text}</CustomText>
      {isRefresh && (
        <Pressable onPress={handleRefresh} accessibilityRole='button'>
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
