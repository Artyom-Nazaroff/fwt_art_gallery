import React, { FC, useState } from 'react';
import './App.scss';
import cn from 'classnames';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import AuthAndRegistration, {
  AuthOrRegistration,
} from './components/AuthAndRegistrationWindow/AuthAndRegistration';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile';

const App: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [variant, setVariant] = useState<AuthOrRegistration>(AuthOrRegistration.auth);

  return (
    <div className={cn('appContainer')}>
      <div className={cn('modalContainer', { 'modalContainer--active': isModalOpened })}>
        <AuthAndRegistration
          variant={variant}
          setVariant={setVariant}
          setIsModalOpened={setIsModalOpened}
        />
      </div>
      <Header setIsModalOpened={setIsModalOpened} setVariant={setVariant} />
      <Routes>
        <Route path="/new_art_gallery" element={<MainPage />} />
        <Route path="/artists/static/:artistId" element={<ArtistProfile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
