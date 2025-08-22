import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

type Props = {
  onUnmount: () => void;
};

/**
 * 페이지를 이동하더라도 이전 페이지가 언마운트 되지않아,
 * 자동으로 언마운트 시점을 감지해주는 hook을 제작
 */
const useUnmount = ({ onUnmount }: Props) => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        onUnmount();
      };
    }, []),
  );
};
export default useUnmount;
