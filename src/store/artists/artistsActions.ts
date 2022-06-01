import { Dispatch } from 'redux';
import { ArtistsAction, ArtistsActionTypes } from './artistsTypes';
import { artistsAPI } from '../../utils/artistsAPI';

export const fetchArtists = () => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    try {
      dispatch({ type: ArtistsActionTypes.FETCH_ARTISTS });
      const response = await artistsAPI.getArtists();
      dispatch({
        type: ArtistsActionTypes.FETCH_ARTISTS_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: ArtistsActionTypes.FETCH_ARTISTS_ERROR,
        payload: `${e}`,
      });
    }
  };
};
