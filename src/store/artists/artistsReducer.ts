import {
  ArtistsAction,
  ArtistsActionTypes,
  ArtistsState,
  Artist,
  ArtistCard,
} from './artistsTypes';

const initialState: ArtistsState = {
  artistProfile: {} as Artist,
  artists: [] as Array<ArtistCard>,
  loading: false,
};

export const artistsReducer = (state = initialState, action: ArtistsAction) => {
  switch (action.type) {
    case ArtistsActionTypes.SHOW_PRELOADER:
      return { ...state, loading: true };
    case ArtistsActionTypes.FETCH_ARTISTS:
      return { ...state, loading: false, artists: action.payload };
    case ArtistsActionTypes.FETCH_ARTIST_PROFILE:
      return { ...state, loading: false, artistProfile: action.payload };
    default:
      return state;
  }
};
