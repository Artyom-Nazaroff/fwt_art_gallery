import axios from 'axios';
import Cookies from 'js-cookie';

const url = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  withCredentials: true,
  baseURL: url,
});

instance.interceptors.request.use((config) => {
  if (config.headers) config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`;
  return config;
});

// instance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//
//     }
//   }
// );
