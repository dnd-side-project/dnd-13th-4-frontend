import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import { api } from '../api';
import { tokenStorage } from './tokenStorage';

export interface AppleAuthResponse {
  identityToken: string | null;
  email: string | null;
  fullName: {
    givenName: string | null;
    familyName: string | null;
  } | null;
  user: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const appleAuth = {
  async isAvailable(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      return false;
    }
    return await AppleAuthentication.isAvailableAsync();
  },

  async signIn(): Promise<AppleAuthResponse | null> {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      return {
        identityToken: credential.identityToken,
        email: credential.email,
        fullName: credential.fullName,
        user: credential.user,
      };
    } catch (error: any) {
      if (
        error instanceof AppleAuthentication.AppleAuthenticationError &&
        error.code === 'ERR_CANCELED'
      ) {
        return null;
      }
      throw error;
    }
  },

  async authenticateWithServer(
    appleCredential: AppleAuthResponse,
  ): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>({
        path: '/auth/login/apple',
        body: {
          idToken: appleCredential.identityToken,
        },
      });

      const { accessToken, refreshToken } = response.data;
      await tokenStorage.setTokens(accessToken, refreshToken);

      return response.data;
    } catch (error) {
      console.error('Apple authentication failed:', error);
      throw error;
    }
  },

  async signInWithApple(): Promise<LoginResponse | null> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        throw new Error('Apple Sign In is not available on this device');
      }

      const appleCredential = await this.signIn();
      if (!appleCredential) {
        return null;
      }

      return await this.authenticateWithServer(appleCredential);
    } catch (error) {
      console.error('Apple Sign In failed:', error);
      throw error;
    }
  },
};
