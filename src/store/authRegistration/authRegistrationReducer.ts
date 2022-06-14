import { AuthAction, AuthActionTypes, AuthState } from './authRegistrationTypes';

const initialState: AuthState = {
  isBtnDisabled: false,
  isAuth: false,
};

export const authRegistrationReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.DISABLE_BUTTON:
      return { ...state, isBtnDisabled: true };
    case AuthActionTypes.SET_AUTH:
      return { ...state, isAuth: true, isBtnDisabled: false };
    case AuthActionTypes.LOG_OUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
