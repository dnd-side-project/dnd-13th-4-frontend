import {
  LATEST_NOTES_PATH,
  MATE_STATUS_PATH,
  ME_PATH,
  MY_STATUS_PATH,
} from '@/constants/api';
import { STACK_SCREENS } from '@/constants/Routes';
import { api } from '@/lib/api';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DebugFloatingTokenButton } from '@/components/debug/DebugFloatingTokenButton';
import GlobalModalHost from '@/components/modal/GlobalModalHost';
import ToastHost from '@/components/ToastHost';
import { useAppState } from '@/hooks/useAppState';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { useNotificationRouting } from '@/lib/notifications/useNotificationRouting';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppStateStatus, Platform } from 'react-native';

// 알림수신 시 포그라운드에서의 동작 정의
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
  useNotificationRouting();
  const [fontsLoaded] = useFonts({
    Pretendard: require('../assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
  });

  const [expoPushToken, setExpoPushToken] = useState<string>('');

  // --- 토큰 전송 함수 ---
  const postPushToken = async (token?: string) => {
    if (!token) return;

    try {
      await api.post({ path: '/notifications/tokens', body: { token } });
    } catch (e) {
      console.warn('[push] token post failed:', e);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token ?? '');
        postPushToken(token);
      })
      .catch((error: any) => setExpoPushToken(`${error}`));

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      responseListener.remove();
    };
  }, []);

  useOnlineManager();
  useAppState(onAppStateChange);

  useEffect(() => {
    const prefetchHomeScreenData = async () => {
      try {
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: [LATEST_NOTES_PATH],
            queryFn: () =>
              api.get({ path: LATEST_NOTES_PATH }).then((res) => res.data),
          }),
          queryClient.prefetchQuery({
            queryKey: [ME_PATH],
            queryFn: () => api.get({ path: ME_PATH }).then((res) => res.data),
          }),
          queryClient.prefetchQuery({
            queryKey: [MY_STATUS_PATH],
            queryFn: () =>
              api.get({ path: MY_STATUS_PATH }).then((res) => res.data),
          }),
          queryClient.prefetchQuery({
            queryKey: [MATE_STATUS_PATH],
            queryFn: () =>
              api.get({ path: MATE_STATUS_PATH }).then((res) => res.data),
          }),
        ]);
      } catch (error) {
        console.warn('Failed to prefetch home screen data:', error);
      }
    };

    if (fontsLoaded) {
      prefetchHomeScreenData().finally(() => {
        SplashScreen.hideAsync();
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {STACK_SCREENS.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              options={screen.options}
            />
          ))}
        </Stack>
        <StatusBar style='auto' />
        <ToastHost />
        <GlobalModalHost />
      </QueryClientProvider>
      <DebugFloatingTokenButton token={expoPushToken} />
    </SafeAreaProvider>
  );
}
