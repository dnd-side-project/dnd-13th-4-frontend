import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccessToken, reissueToken, clearTokens } from './authService';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';

// API 응답 타입
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
}

/**
 * 인증이 필요한 API 요청을 위한 클라이언트
 */
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * HTTP 요청 메서드
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // 기본 헤더 설정
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // 토큰이 필요한 요청인지 확인 (auth 엔드포인트가 아닌 경우)
    const isAuthRequired = !endpoint.startsWith('/auth/login');

    if (isAuthRequired) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // 401 에러인 경우 토큰 재발급 시도
      if (response.status === 401 && isAuthRequired) {
        try {
          const newTokens = await reissueToken();

          // 새 토큰으로 재요청
          headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });

          if (!retryResponse.ok) {
            throw new Error(`HTTP ${retryResponse.status}: ${retryResponse.statusText}`);
          }

          return await retryResponse.json();
        } catch (tokenError) {
          // 토큰 재발급 실패 시 로그아웃 처리
          await clearTokens();
          throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: errorData.code,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }
      throw error;
    }
  }

  /**
   * GET 요청
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST 요청
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT 요청
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH 요청
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE 요청
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// 기본 API 클라이언트 인스턴스
export const apiClient = new ApiClient();