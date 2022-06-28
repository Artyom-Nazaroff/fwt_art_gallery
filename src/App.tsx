import React, { FC, useState } from 'react';
import './App.scss';
import cn from 'classnames';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import { AuthOrRegistration } from './components/AuthAndRegistration/AuthAndRegistration';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile';
import ModalContainer from './components/ModalContainer/ModalContainer';
import { AddOrEditArtist } from './components/AddAndEditArtist/AddAndEditArtist';
import { DeleteArtistOrPainting } from './components/DeletePopup/DeletePopup';
import { AddOrEditPainting } from './components/AddAndEditPainting/AddAndEditPainting';

const App: FC = () => {
  const [addOrEditArtist, setAddOrEditArtist] = useState<AddOrEditArtist>(AddOrEditArtist.add);
  const [addOrEditPainting, setAddOrEditPainting] = useState<AddOrEditPainting>(
    AddOrEditPainting.add
  );
  const [authOrRegistration, setAuthOrRegistration] = useState<AuthOrRegistration>(
    AuthOrRegistration.auth
  );
  const [deleteArtistOrPainting, setDeleteArtistOrPainting] = useState<DeleteArtistOrPainting>(
    DeleteArtistOrPainting.artist
  );
  const [isAuthOpened, setAuthOpened] = useState<boolean>(false);
  const [isDeleteOpened, setDeleteOpened] = useState<boolean>(false);
  const [isAddEditArtistOpened, setAddEditArtistOpened] = useState<boolean>(false);
  const [isAddEditPaintingOpened, setAddEditPaintingOpened] = useState<boolean>(false);
  const [currentPaintingId, setCurrentPaintingId] = useState<string>('');

  return (
    <div className={cn('appContainer')}>
      <ModalContainer
        authOrRegistration={authOrRegistration}
        setAuthOrRegistration={setAuthOrRegistration}
        isAuthOpened={isAuthOpened}
        setAuthOpened={setAuthOpened}
        isDeleteOpened={isDeleteOpened}
        setDeleteOpened={setDeleteOpened}
        isAddEditArtistOpened={isAddEditArtistOpened}
        setAddEditArtistOpened={setAddEditArtistOpened}
        addOrEditArtist={addOrEditArtist}
        addOrEditPainting={addOrEditPainting}
        isAddEditPaintingOpened={isAddEditPaintingOpened}
        setAddEditPaintingOpened={setAddEditPaintingOpened}
        deleteArtistOrPainting={deleteArtistOrPainting}
        currentPaintingId={currentPaintingId}
      />
      <Header setAuthOpened={setAuthOpened} setAuthOrRegistration={setAuthOrRegistration} />
      <div className={cn('centralBlock')}>
        <Routes>
          <Route
            path="/new_art_gallery"
            element={
              <MainPage
                setAddEditArtistOpened={setAddEditArtistOpened}
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
                setAddEditPaintingOpened={setAddEditPaintingOpened}
                setAddEditArtistOpened={setAddEditArtistOpened}
                setAddOrEditArtist={setAddOrEditArtist}
                setAddOrEditPainting={setAddOrEditPainting}
                setDeleteArtistOrPainting={setDeleteArtistOrPainting}
                setCurrentPaintingId={setCurrentPaintingId}
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
