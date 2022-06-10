import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { AuthAction, AuthActionTypes } from './authRegistrationTypes';
import { authRegistrationAPI } from '../../utils/authRegistrationAPI';

export const registerUser = (email: string, password: string, fingerprint: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.DISABLE_BUTTON });
    const response = await authRegistrationAPI.registration(email, password, fingerprint);
    Cookies.set('token', response.accessToken);
    dispatch({
      type: AuthActionTypes.SET_TOKENS,
      payload: response,
    });
  };
};

export const authUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.DISABLE_BUTTON });
    const response = await authRegistrationAPI.authorization(email, password);
    Cookies.set('token', response.accessToken);
    dispatch({
      type: AuthActionTypes.SET_TOKENS,
      payload: response,
    });
  };
};
