export type ArtistsState = {
  artists: any[];
  loading: boolean;
  error: null | string;
};

export enum ArtistsActionTypes {
  FETCH_ARTISTS = 'FETCH_ARTISTS',
  FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS',
  FETCH_ARTISTS_ERROR = 'FETCH_ARTISTS_ERROR',
}

export type FetchArtistsAction = {
  type: ArtistsActionTypes.FETCH_ARTISTS;
};

export type FetchArtistsSuccessAction = {
  type: ArtistsActionTypes.FETCH_ARTISTS_SUCCESS;
  payload: any[];
};

export type FetchArtistsErrorAction = {
  type: ArtistsActionTypes.FETCH_ARTISTS_ERROR;
  payload: string;
};

export type ArtistsAction =
  | FetchArtistsAction
  | FetchArtistsSuccessAction
  | FetchArtistsErrorAction;
