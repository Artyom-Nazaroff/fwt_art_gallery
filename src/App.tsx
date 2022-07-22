import React, { FC } from 'react';
import './App.scss';
import './fonts.scss';
import cn from 'classnames';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile';

const App: FC = () => {
  return (
    <div className={cn('appContainer')}>
      <Header />
      <Routes>
        <Route path="/new_art_gallery" element={<MainPage />} />
        <Route path="/artists/static/:artistId" element={<ArtistProfile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
