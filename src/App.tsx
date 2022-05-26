import React, { FC } from 'react';
import './App.scss';
import { ThemeState } from './context/ThemeState';
import MainPage from './pages/MainPage/MainPage';

const App: FC = () => {
  return (
    <ThemeState>
      <MainPage />
    </ThemeState>
  );
};

export default App;
