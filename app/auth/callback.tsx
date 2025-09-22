import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { saveTokens } from '@/services/authService';
import { TokenResponse } from '@/types/auth';

/**
 * 카카오 로그인 콜백 처리 화면
 * Deep link: com.kirikiri.wini://auth/callback?accessToken=...&refreshToken=...
 */
export default function AuthCallback() {
  const { accessToken, refreshToken } = useLocalSearchParams<{
    accessToken: string;
    refreshToken: string;
  }>();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (accessToken && refreshToken) {
          // "Bearer " 접두사 제거
          const cleanAccessToken = accessToken.replace('Bearer+', '').replace('Bearer ', '');
          const cleanRefreshToken = refreshToken.replace('Bearer+', '').replace('Bearer ', '');

          const tokens: TokenResponse = {
            accessToken: cleanAccessToken,
            refreshToken: cleanRefreshToken,
          };

          // 토큰 저장
          await saveTokens(tokens);

          // 메인 화면으로 이동
          router.replace('/(tabs)');
        } else {
          throw new Error('토큰이 없습니다.');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        // 에러 발생 시 온보딩으로 다시 이동
        router.replace('/onboarding');
      }
    };

    handleAuthCallback();
  }, [accessToken, refreshToken]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>로그인 처리 중...</Text>
    </View>
  );
}