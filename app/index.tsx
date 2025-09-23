import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';

const RootScreen = () => {
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      const { path } = Linking.parse(url);
      if (path === 'app/auth/success') {
        // 카카오 로그인 성공 후 딥링크로 접근
        // TODO: 실제 로그인 상태를 true로 설정하는 로직 추가
        router.replace('/(tabs)');
      }
    };

    // 앱이 열려있을 때 들어오는 딥링크 처리
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // 앱이 닫혀있을 때 딥링크로 열린 경우 처리
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
        return;
      }

      // 일반적인 앱 시작 로직
      // TODO: 실제 로그인 상태 확인 로직 추가
      const isLoggedIn = false; // 임시로 false로 설정

      if (isLoggedIn) {
        router.replace('/(tabs)');
      }
      // 로그인 안 되어 있으면 현재 페이지(온보딩) 유지
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  // 온보딩 컴포넌트를 직접 import해서 사용
  const OnboardingScreen = require('./onboarding/index').default;
  return <OnboardingScreen />;
};

export default RootScreen;
