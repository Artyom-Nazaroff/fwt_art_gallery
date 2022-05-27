import React from 'react';
import './App.scss';
import { ThemeState } from './context/ThemeState';
import MainPage from './pages/MainPage/MainPage';

const App = () => {
  return (
    <ThemeState>
      <MainPage />
    </ThemeState>
  );
};

export default App;
