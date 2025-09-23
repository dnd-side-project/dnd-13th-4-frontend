import {
  APPLE_LOGIN_PATH,
  KAKAO_LOGIN_PATH,
  LOGOUT_PATH,
  TOKEN_REISSUE_PATH,
} from '@/constants/api';
import { IdTokenRequest, TokenResponse } from '@/types/auth';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { api } from '@/lib/api';
import { tokenStorage } from '@/lib/auth/tokenStorage';

/**
 * 카카오 로그인
 */
export const kakaoLogin = async (): Promise<TokenResponse> => {
  try {
    const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

    if (!API_BASE_URL) {
      throw new Error('API URL이 설정되지 않았습니다. 환경변수를 확인해주세요.');
    }

    if (Platform.OS === 'web') {
      // 웹에서는 직접 카카오 로그인 URL로 이동
      const loginUrl = `${API_BASE_URL}${KAKAO_LOGIN_PATH}`;
      window.location.href = loginUrl;
      throw new Error('Redirecting to Kakao login...');
    } else {
      // 모바일에서는 WebBrowser 사용
      const loginUrl = `${API_BASE_URL}${KAKAO_LOGIN_PATH}`;
      const redirectUrl = 'com.kirikiri.wini://auth/callback';

      const result = await WebBrowser.openAuthSessionAsync(
        loginUrl,
        redirectUrl,
      );

      if (result.type === 'success' && result.url) {
        // URL에서 토큰 파라미터 추출
        const url = new URL(result.url);
        const accessToken = url.searchParams.get('accessToken');
        const refreshToken = url.searchParams.get('refreshToken');

        if (!accessToken || !refreshToken) {
          throw new Error('토큰을 받지 못했습니다.');
        }

        // Bearer 접두사 제거
        const cleanAccessToken = accessToken.startsWith('Bearer ')
          ? accessToken.replace('Bearer ', '')
          : accessToken;
        const cleanRefreshToken = refreshToken.startsWith('Bearer ')
          ? refreshToken.replace('Bearer ', '')
          : refreshToken;

        const tokens: TokenResponse = {
          accessToken: cleanAccessToken,
          refreshToken: cleanRefreshToken
        };

        await tokenStorage.setTokens(cleanAccessToken, cleanRefreshToken);
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
    const response = await api.post<TokenResponse>({
      path: APPLE_LOGIN_PATH,
      body: { idToken } as IdTokenRequest,
    });

    const tokens: TokenResponse = response.data;
    await tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
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
    const refreshToken = await tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await api.post<TokenResponse>({
      path: TOKEN_REISSUE_PATH,
      headers: {
        Authorization: refreshToken,
      },
    });

    const tokens: TokenResponse = response.data;
    await tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
    return tokens;
  } catch (error) {
    console.error('Token reissue error:', error);
    await tokenStorage.clearTokens();
    throw error;
  }
};

/**
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  try {
    const accessToken = await tokenStorage.getAccessToken();

    if (accessToken) {
      await api.post({
        path: LOGOUT_PATH,
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    await tokenStorage.clearTokens();
  }
};

/**
 * 토큰 저장
 */
export const saveTokens = async (tokens: TokenResponse): Promise<void> => {
  await tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
};

/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = async (): Promise<string | null> => {
  return await tokenStorage.getAccessToken();
};

/**
 * 리프레시 토큰 가져오기
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return await tokenStorage.getRefreshToken();
};

/**
 * 토큰 삭제
 */
export const clearTokens = async (): Promise<void> => {
  await tokenStorage.clearTokens();
};

/**
 * 로그인 상태 확인
 */
export const isLoggedIn = async (): Promise<boolean> => {
  const accessToken = await tokenStorage.getAccessToken();
  return !!accessToken;
};
