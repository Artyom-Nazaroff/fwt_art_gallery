import { Dispatch } from 'redux';
import { ArtistsAction, ArtistsActionTypes } from './artistsTypes';
import { artistsAPI } from '../../utils/artistsAPI';

export const fetchStaticArtists = () => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getStaticArtists();
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTISTS,
      payload: response,
    });
  };
};

export const fetchArtists = (perPage: number, portionsAmount: number, name: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getArtists(perPage, portionsAmount, name);
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTISTS,
      payload: response.data,
    });
    dispatch({
      type: ArtistsActionTypes.SET_TOTAL_ARTISTS_AMOUNT,
      payload: response.meta.count,
    });
  };
};

export const fetchFilteredArtists = (name: string, genres: string[]) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    dispatch({ type: ArtistsActionTypes.SHOW_PRELOADER });
    const response = await artistsAPI.getFilteredArtists(name, genres);
    dispatch({
      type: ArtistsActionTypes.FETCH_ARTISTS,
      payload: response.data ? response.data : [],
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

export const createArtist = (artistInfo: FormData) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.createArtist(artistInfo);
    dispatch({
      type: ArtistsActionTypes.ADD_ARTIST,
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

export const deleteArtist = (id: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.deleteArtist(id);
    dispatch({
      type: ArtistsActionTypes.DELETE_ARTIST,
      payload: response,
    });
  };
};

export const addNewPainting = (paintingInfo: FormData, artistId: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.addPainting(paintingInfo, artistId);
    dispatch({
      type: ArtistsActionTypes.ADD_PAINTING,
      payload: response.data,
    });
  };
};

export const editPainting = (paintingInfo: FormData, artistId: string, paintingId: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.editPainting(paintingInfo, artistId, paintingId);
    dispatch({
      type: ArtistsActionTypes.EDIT_PAINTING,
      payload: response,
    });
  };
};

export const deletePainting = (artistId: string, paintingId: string) => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    const response = await artistsAPI.deletePainting(artistId, paintingId);
    dispatch({
      type: ArtistsActionTypes.DELETE_PAINTING,
      payload: response,
    });
  };
};

export const editMainPainting = (artistId: string, mainPaintingId: string) => {
  return async () => {
    await artistsAPI.editMainPainting(artistId, mainPaintingId);
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
