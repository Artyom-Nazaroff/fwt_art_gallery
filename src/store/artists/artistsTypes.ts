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
};

export type ArtistsState = {
  artistProfile: Artist;
  artists: Array<ArtistCard>;
  loading: boolean;
};

export enum ArtistsActionTypes {
  SHOW_PRELOADER = 'SHOW_PRELOADER',
  FETCH_ARTISTS = 'FETCH_ARTISTS',
  FETCH_ARTIST_PROFILE = 'FETCH_ARTIST_PROFILE',
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

export type ArtistsAction = ShowPreloader | FetchArtistsAction | FetchArtistProfile;
