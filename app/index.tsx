import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { isLoggedIn } from '@/services/authService';

const RootScreen = () => {
  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      const { path, queryParams } = Linking.parse(url);

      if (path === 'app/auth/success' || (queryParams && ('accessToken' in queryParams))) {
        // 카카오 로그인 성공 후 딥링크로 접근
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          router.replace('/(tabs)');
        }
      }
    };

    // 앱이 열려있을 때 들어오는 딥링크 처리
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // 앱이 닫혀있을 때 딥링크로 열린 경우 처리
    Linking.getInitialURL().then(async (url) => {
      if (url) {
        await handleDeepLink(url);
        return;
      }

      // 일반적인 앱 시작 로직 - 실제 로그인 상태 확인
      const loggedIn = await isLoggedIn();

      if (loggedIn) {
        router.replace('/(tabs)');
      }
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
