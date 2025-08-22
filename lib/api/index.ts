import { buildQuery } from '../buildQuery';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// api.ts
type RequestOptions = {
  path: string;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  { path, params, headers, body }: RequestOptions,
): Promise<{ data: T; status: number }> {
  const url = `${API_URL}${path}${buildQuery(params)}`;
  console.log(API_URL);
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const json: { data: T; status: number } = await res.json();

  return json;
}

export const api = {
  get: <T>(options: RequestOptions) => request<T>('GET', options),
  post: <T>(options: RequestOptions) => request<T>('POST', options),
  put: <T>(options: RequestOptions) => request<T>('PUT', options),
  delete: <T>(options: RequestOptions) => request<T>('DELETE', options),
  patch: <T>(options: RequestOptions) => request<T>('PATCH', options),
};
