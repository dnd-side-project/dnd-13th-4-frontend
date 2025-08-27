import { router } from 'expo-router';
import { useEffect } from 'react';

const RootScreen = () => {
  useEffect(() => {
    // TODO: 실제 로그인 상태 확인 로직 추가
    const isLoggedIn = false; // 임시로 false로 설정
    
    if (isLoggedIn) {
      router.replace('/(tabs)');
    } else {
      router.replace('/onboarding');
    }
  }, []);

  return null;
};

export default RootScreen;