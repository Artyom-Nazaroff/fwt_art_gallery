import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { TokensType } from '../store/authRegistration/authRegistrationTypes';

const url = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  withCredentials: true,
  baseURL: url,
});

instance.interceptors.request.use((config) => {
  if (config.headers) config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`;
  return config;
});

let refreshingToken: Promise<AxiosResponse<any, any>> | null = null;

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    function refreshTokens() {
      const fingerprint = Cookies.get('fingerprint');
      const refreshToken = Cookies.get('refreshToken');
      return axios.post<TokensType>(
        `${url}auth/refresh`,
        { fingerprint, refreshToken },
        { withCredentials: true }
      );
    }
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        refreshingToken = refreshingToken || refreshTokens();
        const res = await refreshingToken;
        refreshingToken = null;
        if (res.data.accessToken) {
          Cookies.set('accessToken', res.data.accessToken);
          Cookies.set('refreshToken', res.data.refreshToken);
        }
        return instance.request(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return originalRequest;
  }
);
