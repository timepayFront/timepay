import axios from 'axios';
import { getTokenFromCookie } from '../utils/token';
import { HEADER_NOT_REQUIRED_URLS } from './urls';

const request = axios.create({
  withCredentials: true,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://localhost:8080/',
});

request.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  // 여기에 token 이 필요한 api 요청일 때만 추가
  config.headers.set(
    'Authorization',
    !HEADER_NOT_REQUIRED_URLS.includes(config.url!)
      ? token
        ? `Baerer ${token}`
        : undefined
      : undefined,
  );
  return config;
});

request.interceptors.response.use();

export const apiRequest = {
  get: (url: string, params?: object) => request.get(url, { ...params }),
  post: (url: string, data: unknown) => request.post(url, data),
  patch: (url: string, data: unknown) => request.patch(url, data),
  put: (url: string, data: unknown) => request.put(url, data),
  delete: (url: string) => request.delete(url),
};
