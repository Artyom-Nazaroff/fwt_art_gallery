import { instance } from './_api';
import { DataType } from '../store/authRegistration/authRegistrationTypes';

export const authRegistrationAPI = {
  registration(data: DataType) {
    return instance.post('auth/register', data).then((response) => response.data);
  },
  authorization(data: DataType) {
    return instance.post(`auth/login`, data).then((response) => response.data);
  },
};
