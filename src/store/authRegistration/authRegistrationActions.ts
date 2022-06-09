import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes, DataType } from './authRegistrationTypes';
import { authRegistrationAPI } from '../../utils/authRegistrationAPI';

export const registerUser = (data: DataType) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.DISABLE_BUTTON });
    // const response = await authRegistrationAPI.registration(data);
    // dispatch({
    //   type: AuthActionTypes.SET_TOKENS,
    //   payload: response,
    // });
  };
};

export const authUser = (data: DataType) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.DISABLE_BUTTON });
    // const response = await authRegistrationAPI.authorization(data);
    // dispatch({
    //   type: AuthActionTypes.SET_TOKENS,
    //   payload: response,
    // });
  };
};
