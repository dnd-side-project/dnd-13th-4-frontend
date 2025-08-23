import { toast } from '@/store/toast.store';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { buildQuery } from '../buildQuery';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type RequestOptions = {
  path: string;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

const client = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
});

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  { path, params, headers, body }: RequestOptions,
): Promise<{ data: T; status: number }> {
  const url = `${path}${buildQuery(params)}`;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    ...(method === 'GET' ? {} : { data: body }),
  };

  try {
    const res = await client.request<{ data: T; status: number }>(config);
    return res.data; // { data, status } 형식 그대로 반환
  } catch (err) {
    const e = err as AxiosError;
    const status = e.response?.status;
    const statusText =
      (e.response as any)?.statusText || e.message || 'Unknown Error';

    const errorMessage = `API Error: ${status ?? 'N/A'}`;

    toast.show(errorMessage);

    throw new Error(`${errorMessage} ${statusText}`);
  }
}

export const api = {
  get: <T>(options: RequestOptions) => request<T>('GET', options),
  post: <T>(options: RequestOptions) => request<T>('POST', options),
  put: <T>(options: RequestOptions) => request<T>('PUT', options),
  delete: <T>(options: RequestOptions) => request<T>('DELETE', options),
  patch: <T>(options: RequestOptions) => request<T>('PATCH', options),
};
