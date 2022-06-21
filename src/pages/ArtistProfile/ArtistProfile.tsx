import React, { FC, Suspense, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useMatch } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './ArtistProfile.module.scss';
import '../../App.scss';
import arrowDT from '../../assets/dark-theme/artist-profile/return-arrow-dt.svg';
import penDT from '../../assets/dark-theme/artist-profile/pen-dt.svg';
import arrowLT from '../../assets/light-theme/artist-profile/return-arrow-lt.svg';
import penLT from '../../assets/light-theme/artist-profile/pen-lt.svg';
import emptyPaintingsDT from '../../assets/dark-theme/artist-info/artwork-icon-dt.svg';
import emptyPaintingsLT from '../../assets/light-theme/artist-info/artwork-lt.svg';
import plus from '../../assets/common-files/empty-paintings-plus.svg';
import ArtistInfo from '../../components/ArtistInfo/ArtistInfo';
import TextLink from '../../components/_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Preloader from '../../components/_UI/Preloader/Preloader';
import PaintingCard from '../../components/PaintingCard/PaintingCard';
import ButtonTrashBin from '../../components/_UI/ButtonTrashBin/ButtonTrashBin';
import { AddOrEditArtist } from '../../components/AddAndEditArtistPopUp/AddAndEditArtist';
import ButtonLink from '../../components/_UI/ButtonLink/ButtonLink';

const AdaptiveGrid = React.lazy(() => import('../../components/AdaptiveGrid/AdaptiveGrid'));

const cn = classNames.bind(styles);

type ArtistProfileProps = {
  setDeleteOpened?: (val: boolean) => void;
  setAddPaintingOpened?: (val: boolean) => void;
  setAddEditOpened?: (val: boolean) => void;
  setAddOrEditArtist?: (val: AddOrEditArtist) => void;
};

const ArtistProfile: FC<ArtistProfileProps> = ({
  setDeleteOpened,
  setAddPaintingOpened,
  setAddEditOpened,
  setAddOrEditArtist,
}) => {
  const { theme } = useContext(ThemeContext);
  const { artistProfile, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const match = useMatch(`artists/${isAuth ? '' : 'static/'}:artistId`);
  const { fetchArtistProfile, setAuthUser } = useActions();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setAuthUser();
      // fetchArtistProfile('', match?.params.artistId);
      // fetchArtistPaintings(match?.params.artistId);
    }
    // if (!Cookies.get('accessToken')) {
    //   fetchArtistProfile('static/', match?.params.artistId);
    // }
  }, []);

  useEffect(() => {
    // Разобраться с ошибкой
    if (Cookies.get('accessToken') && match) fetchArtistProfile('', match.params.artistId);
    if (!Cookies.get('accessToken') && match) fetchArtistProfile('static/', match.params.artistId);
  }, [isAuth]);

  const openWindow = () => {
    setDeleteOpened?.(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div
      className={cn('wrapper', {
        'wrapper--dt': theme === 'dark',
        'wrapper--lt': theme === 'light',
      })}
    >
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div
            className={cn('return', {
              'return--dt': theme === 'dark',
              'return--lt': theme === 'light',
            })}
          >
            <div className={cn('return__container', 'container')}>
              <NavLink to="/new_art_gallery">
                <button className={cn('return__back')} type="button">
                  <img src={theme === 'dark' ? arrowDT : arrowLT} alt="" />
                  <div className={cn('return__link')}>
                    <TextLink text="back" />
                  </div>
                </button>
              </NavLink>
              <div className={cn('return__buttons', { 'return__buttons--active': isAuth })}>
                <button
                  className={cn('return__btn', 'return__pen')}
                  type="button"
                  onClick={() => {
                    setAddEditOpened?.(true);
                    setAddOrEditArtist?.(AddOrEditArtist.edit);
                  }}
                >
                  <img src={theme === 'dark' ? penDT : penLT} alt="" />
                </button>
                <ButtonTrashBin onClick={openWindow} />
              </div>
            </div>
          </div>
          <ArtistInfo
            name={artistProfile.name}
            years={artistProfile.yearsOfLife}
            description={artistProfile.description}
            avatar={artistProfile.avatar}
            genres={artistProfile.genres}
          />
          <div
            className={cn('gallery', {
              'gallery--dt': theme === 'dark',
              'gallery--lt': theme === 'light',
            })}
          >
            <div className={cn('gallery__container', 'container')}>
              <h2 className={cn('gallery__title')}>Artworks</h2>
              {artistProfile.paintings?.length !== 0 ? (
                <Suspense fallback={<Preloader />}>
                  <div className={cn('gallery__row')}>
                    <ButtonLink text="Add picture" onClick={() => setAddPaintingOpened?.(true)} />
                  </div>
                  <AdaptiveGrid>
                    {artistProfile.paintings?.map((i) => (
                      <PaintingCard
                        key={i._id}
                        id={i._id}
                        name={i.name}
                        year={i.yearOfCreation}
                        picture={i.image.src}
                      />
                    ))}
                  </AdaptiveGrid>
                </Suspense>
              ) : (
                <div className={cn('gallery__emptyPaintings')}>
                  <div className={cn('gallery__paintingInner')}>
                    <img src={theme === 'dark' ? emptyPaintingsDT : emptyPaintingsLT} alt="" />
                    <button
                      className={cn('gallery__plus')}
                      type="button"
                      onClick={() => setAddPaintingOpened?.(true)}
                    >
                      <img src={plus} alt="" />
                    </button>
                  </div>
                  <div className={cn('gallery__emptyText')}>
                    The paintings of this artist have not been uploaded yet.
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistProfile;
