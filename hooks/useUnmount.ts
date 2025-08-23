import { useFocusEffect } from 'expo-router';

type Props = {
  onUnmount: () => void;
};

const useUnmount = ({ onUnmount }: Props) => {
  useFocusEffect(() => {
    return () => {
      onUnmount();
    };
  });
};

export default useUnmount;
