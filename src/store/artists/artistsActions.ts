import { Dispatch } from 'redux';
import axios from 'axios';
import { ArtistsAction, ArtistsActionTypes } from './artistsTypes';

export const fetchUsers = () => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    try {
      dispatch({ type: ArtistsActionTypes.FETCH_ARTISTS });
      const response = await axios.get('https://framework.team/');
      dispatch({
        type: ArtistsActionTypes.FETCH_ARTISTS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ArtistsActionTypes.FETCH_ARTISTS_ERROR,
        payload: 'Произошла ошибка!',
      });
    }
  };
};
