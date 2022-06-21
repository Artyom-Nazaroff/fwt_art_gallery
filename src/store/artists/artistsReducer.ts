import {
  Artist,
  ArtistCard,
  ArtistsAction,
  ArtistsActionTypes,
  ArtistsState,
  Genre,
} from './artistsTypes';

const initialState: ArtistsState = {
  artistProfile: {} as Artist,
  artists: [] as Array<ArtistCard>,
  genres: [] as Array<Genre>,
  loading: false,
};

export const artistsReducer = (state: ArtistsState = initialState, action: ArtistsAction) => {
  switch (action.type) {
    case ArtistsActionTypes.SHOW_PRELOADER:
      return { ...state, loading: true };
    case ArtistsActionTypes.FETCH_ARTISTS:
      return { ...state, loading: false, artists: action.payload };
    case ArtistsActionTypes.FETCH_ARTIST_PROFILE:
      return { ...state, loading: false, artistProfile: action.payload };
    case ArtistsActionTypes.GET_ALL_GENRES:
      return { ...state, genres: action.payload };
    case ArtistsActionTypes.ADD_ARTIST:
      return { ...state, artists: [...state.artists, action.payload] };
    case ArtistsActionTypes.EDIT_ARTIST:
      return { ...state, artistProfile: action.payload };
    case ArtistsActionTypes.ADD_PAINTING:
      return {
        ...state,
        artistProfile: {
          ...state.artistProfile,
          paintings: [...state.artistProfile.paintings, action.payload],
        },
      };
    default:
      return state;
  }
};
