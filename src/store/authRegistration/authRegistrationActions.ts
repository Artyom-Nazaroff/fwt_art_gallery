import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { AuthAction, AuthActionTypes } from './authRegistrationTypes';
import { authRegistrationAPI } from '../../utils/authRegistrationAPI';

export const registerUser = (username: string, password: string, fingerprint: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.DISABLE_BUTTON });
    const response = await authRegistrationAPI.registration(username, password, fingerprint);
    Cookies.set('accessToken', response.accessToken);
    Cookies.set('refreshToken', response.refreshToken);
    dispatch({ type: AuthActionTypes.SET_AUTH });
  };
};

export const authUser = (username: string, password: string, fingerprint: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.DISABLE_BUTTON });
    const response = await authRegistrationAPI.authorization(username, password, fingerprint);
    Cookies.set('accessToken', response.accessToken);
    Cookies.set('refreshToken', response.refreshToken);
    dispatch({ type: AuthActionTypes.SET_AUTH });
  };
};

export const logOutUser = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    dispatch({ type: AuthActionTypes.LOG_OUT });
  };
};

export const checkAuth = (fingerprint: string, refreshToken: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    const response = await authRegistrationAPI.refresh(fingerprint, refreshToken);
    Cookies.set('accessToken', response.accessToken);
    Cookies.set('refreshToken', response.refreshToken);
    dispatch({ type: AuthActionTypes.SET_AUTH });
  };
};
