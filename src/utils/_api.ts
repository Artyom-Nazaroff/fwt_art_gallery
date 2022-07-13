import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ClientJS } from 'clientjs';
import { TokensType } from '../store/authRegistration/authRegistrationTypes';

const url = process.env.REACT_APP_BASE_URL;

const client = new ClientJS();
const pluginList = client.getPlugins();
const fontList = client.getFonts();
const localStorage = Number(client.isLocalStorage());
const sessionStorage = Number(client.isSessionStorage());
const timeZone = client.getTimeZone();
const language = client.getLanguage();
const systemLanguage = client.getSystemLanguage();
const cookies = Number(client.isCookie());
const canvasPrint = client.getCanvasPrint();
const fingerprint = String(
  client.getCustomFingerprint(
    pluginList,
    fontList,
    localStorage,
    sessionStorage,
    timeZone,
    language,
    systemLanguage,
    cookies,
    canvasPrint
  )
);

export const instance = axios.create({
  withCredentials: true,
  baseURL: url,
});

instance.interceptors.request.use((config) => {
  if (config.headers) config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`;
  return config;
});

let refreshingToken: Promise<AxiosResponse<TokensType, string>> | null = null;

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshTokens = () => {
      const refreshToken = Cookies.get('refreshToken');
      return axios.post<TokensType>(
        `${url}auth/refresh`,
        { fingerprint, refreshToken },
        { withCredentials: true }
      );
    };
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
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/new_art_gallery';
        return Promise.reject(err);
      }
    }
    return originalRequest;
  }
);
