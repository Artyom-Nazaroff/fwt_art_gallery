import { Dispatch } from 'redux';
import { ArtistsAction, ArtistsActionTypes } from './artistsTypes';
import { artistsAPI } from '../../utils/artistsAPI';

export const fetchArtists = (isStatic: 'static' | '') => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getArtists(isStatic);
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTISTS,
      payload: isStatic === '' ? response.data : response,
    });
  };
};

export const fetchArtistProfile = (isStatic: 'static/' | '', id: string | undefined) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getArtistProfile(isStatic, id);
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTIST_PROFILE,
      payload: response,
    });
  };
};

export const getAllGenres = () => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.getGenres();
    dispatch({
      type: ArtistsActionTypes.GET_ALL_GENRES,
      payload: response,
    });
  };
};

export const createArtist = (artistInfo: FormData) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.createArtist(artistInfo);
    dispatch({
      type: ArtistsActionTypes.ADD_ARTIST,
      payload: response,
    });
  };
};

export const deleteArtist = (id: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.deleteArtist(id);
    dispatch({
      type: ArtistsActionTypes.ADD_ARTIST,
      payload: response,
    });
  };
};

export const addNewPainting = (paintingInfo: FormData) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.addPainting(paintingInfo);
    dispatch({
      type: ArtistsActionTypes.ADD_PAINTING,
      payload: response,
    });
  };
};

export const editArtist = (artistInfo: FormData, id: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.editArtist(artistInfo, id);
    dispatch({
      type: ArtistsActionTypes.EDIT_ARTIST,
      payload: response,
    });
  };
};
