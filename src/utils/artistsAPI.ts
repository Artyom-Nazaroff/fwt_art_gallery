import { instance } from './_api';

export const artistsAPI = {
  getArtists() {
    return instance.get('artists/static').then((response) => response.data);
  },
};
