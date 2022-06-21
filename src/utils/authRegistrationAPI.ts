import { instance } from './_api';
import { TokensType } from '../store/authRegistration/authRegistrationTypes';

// const url = process.env.REACT_APP_BASE_URL;

export const authRegistrationAPI = {
  registration(username: string, password: string, fingerprint: string) {
    return instance
      .post<TokensType>('auth/register', { username, password, fingerprint })
      .then((response) => response.data);
  },
  authorization(username: string, password: string, fingerprint: string) {
    return instance
      .post<TokensType>(`auth/login`, { username, password, fingerprint })
      .then((response) => response.data);
  },
  // refresh(fingerprint: string, refreshToken: string) {
  //   return axios
  //     .post<TokensType>(
  //       `${url}auth/refresh`,
  //       { fingerprint, refreshToken },
  //       { withCredentials: true }
  //     )
  //     .then((response) => response.data);
  // },
};
