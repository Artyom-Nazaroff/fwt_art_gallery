export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  isAuth: boolean;
  isBtnDisabled: boolean;
};

export enum AuthActionTypes {
  DISABLE_BUTTON = 'DISABLE_BUTTON',
  SET_AUTH = 'SET_AUTH',
  LOG_OUT = 'LOG_OUT',
}

export type DisableButton = {
  type: AuthActionTypes.DISABLE_BUTTON;
};

export type SetAuth = {
  type: AuthActionTypes.SET_AUTH;
};

export type LogOut = {
  type: AuthActionTypes.LOG_OUT;
};

export type AuthAction = DisableButton | SetAuth | LogOut;
