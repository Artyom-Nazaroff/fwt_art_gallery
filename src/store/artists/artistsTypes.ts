type MainPaintingType = {
  artist: string;
  name: string;
  yearOfCreation: string;
  _id: string;
  image: {
    original: string;
    src: string;
    src2x: string;
    webp: string;
    webp2x: string;
    _id: string;
  };
};

export type ArtistItemType = {
  name: string;
  yearsOfLife: string;
  description: string;
  __v: number;
  _id: string;
  genres: Array<string>;
  mainPainting: MainPaintingType;
};

export type ArtistsState = {
  artists: Array<ArtistItemType>;
  loading: boolean;
  error: undefined | string;
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
  payload: Array<ArtistItemType>;
};

export type FetchArtistsErrorAction = {
  type: ArtistsActionTypes.FETCH_ARTISTS_ERROR;
  payload: string;
};

export type ArtistsAction =
  | FetchArtistsAction
  | FetchArtistsSuccessAction
  | FetchArtistsErrorAction;
