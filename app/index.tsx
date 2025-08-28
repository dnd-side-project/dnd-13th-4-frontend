import { router } from 'expo-router';
import { useEffect } from 'react';

const RootScreen = () => {
  useEffect(() => {
    // TODO: 실제 로그인 상태 확인 로직 추가
    const isLoggedIn = false; // 임시로 false로 설정
    
    if (isLoggedIn) {
      router.replace('/(tabs)');
    }
    // 로그인 안 되어 있으면 현재 페이지(온보딩) 유지
  }, []);

  // 온보딩 컴포넌트를 직접 import해서 사용
  const OnboardingScreen = require('./onboarding/index').default;
  return <OnboardingScreen />;
};

export default RootScreen;