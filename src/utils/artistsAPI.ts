import { instance } from './_api';

export const artistsAPI = {
  getStaticArtists() {
    return instance.get(`artists/static`).then((response) => response.data);
  },
  getArtists(
    perPage: number,
    portionsAmount: number,
    name: string,
    genres: string[],
    orderBy: 'asc' | 'desc' | null
  ) {
    return instance
      .get(`artists/`, {
        params: {
          perPage: perPage * portionsAmount,
          pageNumber: 1,
          name,
          genres,
          orderBy,
          sortBy: orderBy !== null ? 'name' : null,
        },
      })
      .then((response) => {
        // debugger;
        return response.data ? response.data : [];
      });
  },
  // getFilteredArtists(name: string, genres: string[], orderBy: 'asc' | 'desc' | null) {
  //   return instance
  //     .get(`artists`, {
  //       params: {
  //         name,
  //         genres,
  //         orderBy,
  //         sortBy: orderBy !== null ? 'name' : null,
  //       },
  //     })
  //     .then((response) => {
  //       return response.data ? response.data : [];
  //     });
  // },
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
  deletePainting(artistId: string, paintingId: string) {
    return instance
      .delete(`artists/${artistId}/paintings/${paintingId}`)
      .then((response) => response.data);
  },
  addPainting(paintingInfo: FormData, artistId: string) {
    return instance
      .post(`artists/${artistId}/paintings`, paintingInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response);
  },
  editPainting(paintingInfo: FormData, artistId: string, paintingId: string) {
    return instance
      .put(`artists/${artistId}/paintings/${paintingId}`, paintingInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  editMainPainting(artistId: string, mainPaintingId: string) {
    return instance.patch(`artists/${artistId}/main-painting`, { mainPainting: mainPaintingId });
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
