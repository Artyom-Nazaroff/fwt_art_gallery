import React, { FC, useState } from 'react';
import './App.scss';
import cn from 'classnames';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import { AuthOrRegistration } from './components/AuthAndRegistrationWindow/AuthAndRegistration';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile';
import ModalContainer from './components/ModalContainer/ModalContainer';
import { AddOrEditArtist } from './components/AddAndEditArtistPopUp/AddAndEditArtist';

const App: FC = () => {
  const [isAuthOpened, setAuthOpened] = useState<boolean>(false);
  const [authOrRegistration, setAuthOrRegistration] = useState<AuthOrRegistration>(
    AuthOrRegistration.auth
  );
  const [isDeleteOpened, setDeleteOpened] = useState<boolean>(false);
  const [addOrEditArtist, setAddOrEditArtist] = useState<AddOrEditArtist>(AddOrEditArtist.add);
  const [isAddEditOpened, setAddEditOpened] = useState<boolean>(false);
  const [isAddPaintingOpened, setAddPaintingOpened] = useState<boolean>(false);

  return (
    <div className={cn('appContainer')}>
      <ModalContainer
        authOrRegistration={authOrRegistration}
        setAuthOrRegistration={setAuthOrRegistration}
        isAuthOpened={isAuthOpened}
        setAuthOpened={setAuthOpened}
        isDeleteOpened={isDeleteOpened}
        setDeleteOpened={setDeleteOpened}
        isAddEditOpened={isAddEditOpened}
        setAddEditOpened={setAddEditOpened}
        addOrEditArtist={addOrEditArtist}
        isAddPaintingOpened={isAddPaintingOpened}
        setAddPaintingOpened={setAddPaintingOpened}
      />
      <Header setAuthOpened={setAuthOpened} setAuthOrRegistration={setAuthOrRegistration} />
      <div className={cn('centralBlock')}>
        <Routes>
          <Route
            path="/new_art_gallery"
            element={
              <MainPage
                setAddEditOpened={setAddEditOpened}
                setAddOrEditArtist={setAddOrEditArtist}
              />
            }
          />
          <Route path="/artists/static/:artistId" element={<ArtistProfile />} />
          <Route
            path="/artists/:artistId"
            element={
              <ArtistProfile
                setDeleteOpened={setDeleteOpened}
                setAddPaintingOpened={setAddPaintingOpened}
                setAddEditOpened={setAddEditOpened}
                setAddOrEditArtist={setAddOrEditArtist}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
