import { instance } from './_api';

export const artistsAPI = {
  getArtists(isStatic: 'static' | '') {
    return instance.get(`artists/${isStatic}`).then((response) => response.data);
  },
  getArtistProfile(isStatic: 'static/' | '', id: string | undefined) {
    return instance.get(`artists/${isStatic}${id}`).then((response) => response.data);
  },
  getGenres() {
    return instance.get(`genres`).then((response) => response.data);
  },
  createArtist(artistInfo: FormData) {
    return instance
      .post(`artists`, artistInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  deleteArtist(id: string) {
    return instance.delete(`artists/${id}`).then((response) => response.data);
  },
  addPainting(paintingInfo: FormData) {
    return instance
      .post(`artists`, paintingInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  editArtist(artistInfo: FormData, id: string) {
    return instance
      .put(`artists/${id}`, artistInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
};
