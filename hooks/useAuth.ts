import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import {
  kakaoLogin,
  logout as logoutService,
  isLoggedIn,
  getAccessToken
} from '@/services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 초기 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loggedIn = await isLoggedIn();
      const token = await getAccessToken();
      setIsAuthenticated(loggedIn);
      setAccessToken(token);
    } catch (error) {
      console.error('Auth status check error:', error);
      setIsAuthenticated(false);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      const tokens = await kakaoLogin();
      setIsAuthenticated(true);
      setAccessToken(tokens.accessToken);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Kakao login failed:', error);
      Alert.alert(
        '로그인 실패',
        error instanceof Error ? error.message : '카카오 로그인에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);

      // 실제 Apple ID 토큰은 백엔드에서 처리되므로
      // 여기서는 임시 토큰으로 테스트하거나 WebBrowser 사용
      Alert.alert(
        '개발 중',
        'Apple 로그인은 아직 구현 중입니다.\n실제 앱에서는 WebBrowser를 통한 OAuth 플로우를 사용합니다.'
      );
    } catch (error: any) {
      console.error('Apple login failed:', error);
      Alert.alert(
        '로그인 실패',
        error instanceof Error ? error.message : 'Apple 로그인에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logoutService();
      setIsAuthenticated(false);
      setAccessToken(null);
      router.replace('/onboarding');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert(
        '로그아웃 실패',
        error instanceof Error ? error.message : '로그아웃에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    accessToken,
    handleKakaoLogin,
    handleAppleLogin,
    handleLogout,
    checkAuthStatus,
  };
};