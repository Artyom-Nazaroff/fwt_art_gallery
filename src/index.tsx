import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './fonts.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/store';
import { ThemeState } from './context/ThemeState';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeState>
        <App />
      </ThemeState>
    </Provider>
  </BrowserRouter>
);
