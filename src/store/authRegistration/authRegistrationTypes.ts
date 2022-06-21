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
  ABLE_BUTTON = 'ABLE_BUTTON',
  SET_AUTH = 'SET_AUTH',
  LOG_OUT = 'LOG_OUT',
}

export type DisableButton = {
  type: AuthActionTypes.DISABLE_BUTTON;
};

export type AbleButton = {
  type: AuthActionTypes.ABLE_BUTTON;
};

export type SetAuth = {
  type: AuthActionTypes.SET_AUTH;
};

export type LogOut = {
  type: AuthActionTypes.LOG_OUT;
};

export type AuthAction = DisableButton | AbleButton | SetAuth | LogOut;
