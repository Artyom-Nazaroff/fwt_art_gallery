import { ArtistsAction, ArtistsActionTypes, ArtistsState } from './artistsTypes';

const initialState: ArtistsState = {
  artists: [
    { name: 'Jean-Honore Fragonard', years: '1732 - 1806' },
    { name: 'John Peter Russell', years: '1858 - 1930' },
    { name: 'Vasily Pukirev', years: '1832 - 1890' },
    { name: 'Gerrit van Honthorst', years: '1592 - 1656' },
  ],
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
