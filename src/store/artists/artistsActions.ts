import { Dispatch } from 'redux';
import { ArtistsAction, ArtistsActionTypes } from './artistsTypes';
import { artistsAPI } from '../../utils/artistsAPI';

export const fetchArtists = () => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getArtists();
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTISTS,
      payload: response,
    });
  };
};

export const fetchArtistProfile = (id: string | undefined) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getArtistProfile(id);
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTIST_PROFILE,
      payload: response,
    });
  };
};
