import { AuthAction, AuthActionTypes, AuthState } from './authRegistrationTypes';

const initialState: AuthState = {
  isBtnDisabled: false,
  accessToken: null,
  refreshToken: null,
};

export const authRegistrationReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.DISABLE_BUTTON:
      return { ...state, isBtnDisabled: true };
    case AuthActionTypes.SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isBtnDisabled: false,
      };
    default:
      return state;
  }
};
