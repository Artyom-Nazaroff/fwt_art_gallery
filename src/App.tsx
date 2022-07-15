import React, { FC, useEffect, useState } from 'react';
import './App.scss';
import cn from 'classnames';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import { AuthOrRegistration } from './components/AuthAndRegistration/AuthAndRegistration';
import ArtistProfile from './pages/ArtistProfile/ArtistProfile';
import ModalContainer from './components/ModalContainer/ModalContainer';
import { AddOrEditArtist } from './components/AddAndEditArtist/AddAndEditArtist';
import { DeleteArtistOrPainting } from './components/DeletePopup/DeletePopup';
import { AddOrEditPainting } from './components/AddAndEditPainting/AddAndEditPainting';
import Toast from './components/_UI/Toast/Toast';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import ScrollUpButton from './components/_UI/ScrollUpButton/ScrollUpButton';

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
  const [visibleScrollBtn, setVisibleScrollBtn] = useState<boolean>(false);
  const { setAuthUser } = useActions();
  const { errorMessage } = useTypedSelector((state) => state.artists);

  useEffect(() => {
    if (Cookies.get('accessToken')) setAuthUser();
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) setVisibleScrollBtn(true);
    if (scrolled <= 200) setVisibleScrollBtn(false);
  };

  window.addEventListener('scroll', toggleVisible);

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
          <Route
            path="*"
            element={
              <MainPage
                setAddEditArtistOpened={setAddEditArtistOpened}
                setAddOrEditArtist={setAddOrEditArtist}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
      {errorMessage && <Toast text={errorMessage} />}
      <ScrollUpButton visibleScrollBtn={visibleScrollBtn} />
    </div>
  );
};

export default App;
