import { ArtistsAction, ArtistsActionTypes, ArtistsState } from './artistsTypes';

const initialState: ArtistsState = {
  artists: [],
  loading: false,
  error: null,
};

export const artistsReducer = (state = initialState, action: ArtistsAction) => {
  switch (action.type) {
    case ArtistsActionTypes.FETCH_ARTISTS:
      return { ...state, loading: true };
    case ArtistsActionTypes.FETCH_ARTISTS_SUCCESS:
      return { ...state, loading: false, artists: action.payload };
    case ArtistsActionTypes.FETCH_ARTISTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
