import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { artistsReducer } from './artists/artistsReducer';
import { authRegistrationReducer } from './authRegistration/authRegistrationReducer';

const rootReducer = combineReducers({
  artists: artistsReducer,
  authRegistration: authRegistrationReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
