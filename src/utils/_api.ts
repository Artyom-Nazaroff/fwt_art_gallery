import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://internship-front.framework.team/',
});

// instance.interceptors.request.use((config) => {
//   if (config.headers) config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
//   return config;
// });

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
