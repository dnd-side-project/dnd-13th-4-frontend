import { APPLE_LOGIN_PATH, KAKAO_LOGIN_PATH, LOGOUT_PATH, TOKEN_REISSUE_PATH } from '@/constants/api';
import { TokenResponse, IdTokenRequest, AuthError } from '@/types/auth';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';

// Token Storage Keys
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * 카카오 로그인
 */
export const kakaoLogin = async (): Promise<TokenResponse> => {
  try {
    if (Platform.OS === 'web') {
      // 웹에서는 직접 카카오 로그인 URL로 이동
      window.location.href = `${API_BASE_URL}${KAKAO_LOGIN_PATH}`;
      throw new Error('Redirecting to Kakao login...');
    } else {
      // 모바일에서는 WebBrowser 사용
      const result = await WebBrowser.openAuthSessionAsync(
        `${API_BASE_URL}${KAKAO_LOGIN_PATH}`,
        'com.kirikiri.wini://auth/callback'
      );

      if (result.type === 'success' && result.url) {
        // URL에서 토큰 파라미터 추출
        const url = new URL(result.url);
        const accessToken = url.searchParams.get('accessToken');
        const refreshToken = url.searchParams.get('refreshToken');

        if (!accessToken || !refreshToken) {
          throw new Error('토큰을 받지 못했습니다.');
        }

        const tokens: TokenResponse = { accessToken, refreshToken };
        await saveTokens(tokens);
        return tokens;
      } else {
        throw new Error('카카오 로그인이 취소되었습니다.');
      }
    }
  } catch (error) {
    console.error('Kakao login error:', error);
    throw error;
  }
};

/**
 * 애플 로그인
 */
export const appleLogin = async (idToken: string): Promise<TokenResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}${APPLE_LOGIN_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken } as IdTokenRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '애플 로그인에 실패했습니다.');
    }

    const tokens: TokenResponse = await response.json();
    await saveTokens(tokens);
    return tokens;
  } catch (error) {
    console.error('Apple login error:', error);
    throw error;
  }
};

/**
 * 토큰 재발급
 */
export const reissueToken = async (): Promise<TokenResponse> => {
  try {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await fetch(`${API_BASE_URL}${TOKEN_REISSUE_PATH}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('토큰 재발급에 실패했습니다.');
    }

    const tokens: TokenResponse = await response.json();
    await saveTokens(tokens);
    return tokens;
  } catch (error) {
    console.error('Token reissue error:', error);
    await clearTokens();
    throw error;
  }
};

/**
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      await fetch(`${API_BASE_URL}${LOGOUT_PATH}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    await clearTokens();
  }
};

/**
 * 토큰 저장
 */
export const saveTokens = async (tokens: TokenResponse): Promise<void> => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 리프레시 토큰 가져오기
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 토큰 삭제
 */
export const clearTokens = async (): Promise<void> => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * 로그인 상태 확인
 */
export const isLoggedIn = async (): Promise<boolean> => {
  const accessToken = await getAccessToken();
  return !!accessToken;
};