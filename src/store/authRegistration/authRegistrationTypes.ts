export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  isBtnDisabled: boolean;
};

export enum AuthActionTypes {
  DISABLE_BUTTON = 'DISABLE_BUTTON',
  SET_TOKENS = 'SET_TOKENS',
}

export type DisableButton = {
  type: AuthActionTypes.DISABLE_BUTTON;
};

export type SetTokens = {
  type: AuthActionTypes.SET_TOKENS;
  payload: TokensType;
};

export type AuthAction = DisableButton | SetTokens;
