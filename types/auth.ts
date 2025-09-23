// Auth Types
export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type IdTokenRequest = {
  idToken: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    image: string;
  };
};

export type AuthError = {
  message: string;
  code: string;
};