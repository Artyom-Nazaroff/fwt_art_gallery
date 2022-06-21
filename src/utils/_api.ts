import axios from 'axios';
import Cookies from 'js-cookie';
import { ClientJS } from 'clientjs';
import { useNavigate } from 'react-router-dom';
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

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      const client = new ClientJS();
      const fingerprint = `${client.getFingerprint()}`;
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        const data = await axios
          .post<TokensType>(
            `${url}auth/refresh`,
            { fingerprint, refreshToken },
            { withCredentials: true }
          )
          .then((response) => response.data);
        Cookies.set('accessToken', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);
      } else {
        const navigate = useNavigate();
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/new_art_gallery');
      }
      return instance.request(originalRequest);
    }
    return originalRequest;
  }
);
