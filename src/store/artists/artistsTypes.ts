export type Painting = {
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

export type Genre = {
  _id: string;
  name: string;
};

export type Artist = {
  name: string;
  yearsOfLife: string;
  description: string;
  __v: number;
  _id: string;
  genres: Array<Genre>;
  mainPainting: Painting;
  paintings: Array<Painting>;
  avatar: Painting['image'];
};

export type ArtistCard = {
  genres: Array<string>;
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v: number;
  mainPainting: Painting;
  avatar?: string;
};

export type ArtistsState = {
  artistProfile: Artist;
  artists: Array<ArtistCard>;
  artistsAmount: number;
  genres: Array<Genre>;
  loading: boolean;
};

export enum ArtistsActionTypes {
  SHOW_PRELOADER = 'SHOW_PRELOADER',
  FETCH_ARTISTS = 'FETCH_ARTISTS',
  FETCH_ARTIST_PROFILE = 'FETCH_ARTIST_PROFILE',
  GET_ALL_GENRES = 'GET_ALL_GENRES',
  ADD_ARTIST = 'ADD_ARTIST',
  EDIT_ARTIST = 'EDIT_ARTIST',
  DELETE_ARTIST = 'DELETE_ARTIST',
  DELETE_PAINTING = 'DELETE_PAINTING',
  ADD_PAINTING = 'ADD_PAINTING',
  EDIT_PAINTING = 'EDIT_PAINTING',
  SET_TOTAL_ARTISTS_AMOUNT = 'SET_TOTAL_ARTISTS_AMOUNT',
}

export type ShowPreloader = {
  type: ArtistsActionTypes.SHOW_PRELOADER;
};

export type FetchArtistsAction = {
  type: ArtistsActionTypes.FETCH_ARTISTS;
  payload: Array<ArtistCard>;
};

export type FetchArtistProfile = {
  type: ArtistsActionTypes.FETCH_ARTIST_PROFILE;
  payload: Artist;
};

export type GetAllGenres = {
  type: ArtistsActionTypes.GET_ALL_GENRES;
  payload: Array<Genre>;
};

export type AddArtist = {
  type: ArtistsActionTypes.ADD_ARTIST;
  payload: ArtistCard;
};

export type EditArtist = {
  type: ArtistsActionTypes.EDIT_ARTIST;
  payload: Artist;
};

export type DeleteArtist = {
  type: ArtistsActionTypes.DELETE_ARTIST;
  payload: string;
};

export type DeletePainting = {
  type: ArtistsActionTypes.DELETE_PAINTING;
  payload: string;
};

export type AddNewPainting = {
  type: ArtistsActionTypes.ADD_PAINTING;
  payload: Painting;
};

export type EditPainting = {
  type: ArtistsActionTypes.EDIT_PAINTING;
  payload: Painting;
};

export type setTotalArtistsAmount = {
  type: ArtistsActionTypes.SET_TOTAL_ARTISTS_AMOUNT;
  payload: number;
};

export type ArtistsAction =
  | ShowPreloader
  | FetchArtistsAction
  | FetchArtistProfile
  | GetAllGenres
  | AddArtist
  | AddNewPainting
  | DeleteArtist
  | EditArtist
  | DeletePainting
  | EditPainting
  | setTotalArtistsAmount;
