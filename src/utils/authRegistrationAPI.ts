import { instance } from './_api';
import { TokensType } from '../store/authRegistration/authRegistrationTypes';

export const authRegistrationAPI = {
  registration(email: string, password: string, fingerprint: string) {
    return instance
      .post<TokensType>('auth/register', { email, password, fingerprint })
      .then((response) => response.data);
  },
  authorization(email: string, password: string) {
    return instance
      .post<TokensType>(`auth/login`, { email, password })
      .then((response) => response.data);
  },
};
