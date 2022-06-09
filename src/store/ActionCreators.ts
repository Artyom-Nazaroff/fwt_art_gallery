import * as ArtistsActionCreators from './artists/artistsActions';
import * as AuthActionCreators from './authRegistration/authRegistrationActions';

const ActionCreators = {
  ...ArtistsActionCreators,
  ...AuthActionCreators,
};

export default ActionCreators;
