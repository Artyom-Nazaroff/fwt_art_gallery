import React, { FC, Suspense, useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useMatch } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './ArtistProfile.module.scss';
import '../../App.scss';
import arrowDT from '../../assets/dark-theme/artist-profile/return-arrow-dt.svg';
import arrowLT from '../../assets/light-theme/artist-profile/return-arrow-lt.svg';
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
import ButtonEditDelete, {
  EditOrDeleteButton,
} from '../../components/_UI/ButtonEditDeleteProfile/ButtonEditDelete';
import { AddOrEditArtist } from '../../components/AddAndEditArtist/AddAndEditArtist';
import ButtonLink from '../../components/_UI/ButtonLink/ButtonLink';
import Slider from '../../components/_UI/Slider/Slider';
import { DeleteArtistOrPainting } from '../../components/DeletePopup/DeletePopup';
import { AddOrEditPainting } from '../../components/AddAndEditPainting/AddAndEditPainting';
import Pagination from '../../components/_UI/Pagination/Pagination';

const AdaptiveGrid = React.lazy(() => import('../../components/AdaptiveGrid/AdaptiveGrid'));

const cn = classNames.bind(styles);

type ArtistProfileProps = {
  setDeleteOpened?: (val: boolean) => void;
  setAddEditPaintingOpened?: (val: boolean) => void;
  setAddEditArtistOpened?: (val: boolean) => void;
  setCurrentPaintingId?: (val: string) => void;
  setAddOrEditArtist?: (val: AddOrEditArtist) => void;
  setAddOrEditPainting?: (val: AddOrEditPainting) => void;
  setDeleteArtistOrPainting?: (val: DeleteArtistOrPainting) => void;
};

const ArtistProfile: FC<ArtistProfileProps> = ({
  setDeleteOpened,
  setAddEditPaintingOpened,
  setAddEditArtistOpened,
  setAddOrEditArtist,
  setAddOrEditPainting,
  setDeleteArtistOrPainting,
  setCurrentPaintingId,
}) => {
  const [isSliderVisible, setIsSliderVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [paintingData, setPaintingData] = useState<{ id: string; index: number }>({
    id: '',
    index: 0,
  });
  const { theme } = useContext(ThemeContext);
  const { artistProfile, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const match = useMatch(`artists/${isAuth ? '' : 'static/'}:artistId`);
  const { fetchArtistProfile, setAuthUser } = useActions();

  useEffect(() => {
    window.scroll(0, 0);
    if (Cookies.get('accessToken')) {
      setAuthUser();
    }
  }, []);

  useEffect(() => {
    if (isAuth && Cookies.get('accessToken') && match)
      fetchArtistProfile('', match?.params.artistId);
    if (!isAuth && !Cookies.get('accessToken') && match)
      fetchArtistProfile('static/', match?.params.artistId);
  }, [isAuth]);

  const paintingsPage = artistProfile?.paintings?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openDeleteWindow = () => {
    setDeleteOpened?.(true);
    setDeleteArtistOrPainting?.(DeleteArtistOrPainting.artist);
  };

  const openEditWindow = () => {
    setAddEditArtistOpened?.(true);
    setAddOrEditArtist?.(AddOrEditArtist.edit);
  };

  const openSlider = (id: string, index: number) => {
    setIsSliderVisible(true);
    setPaintingData({ id, index });
  };

  if (isSliderVisible && artistProfile?.paintings?.length)
    return (
      <Slider
        paintingData={paintingData}
        setIsSliderVisible={setIsSliderVisible}
        setDeleteOpened={setDeleteOpened}
        setAddEditPaintingOpened={setAddEditPaintingOpened}
        setDeleteArtistOrPainting={setDeleteArtistOrPainting}
        setCurrentPaintingId={setCurrentPaintingId}
      />
    );

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
                <span className={cn('return__back')}>
                  <img src={theme === 'dark' ? arrowDT : arrowLT} alt="" />
                  <div className={cn('return__link')}>
                    <TextLink text="back" />
                  </div>
                </span>
              </NavLink>
              <div className={cn('return__buttons', { 'return__buttons--active': isAuth })}>
                <span className={cn('return__btn')}>
                  <ButtonEditDelete
                    variant={EditOrDeleteButton.edit}
                    onClick={openEditWindow}
                    transparent={false}
                  />
                </span>
                <ButtonEditDelete
                  variant={EditOrDeleteButton.delete}
                  onClick={openDeleteWindow}
                  transparent={false}
                />
              </div>
            </div>
          </div>
          <ArtistInfo
            name={artistProfile?.name}
            years={artistProfile?.yearsOfLife}
            description={artistProfile?.description}
            avatar={artistProfile?.avatar}
            genres={artistProfile?.genres}
          />
          <div
            className={cn('gallery', {
              'gallery--dt': theme === 'dark',
              'gallery--lt': theme === 'light',
            })}
          >
            <div className={cn('gallery__container', 'container')}>
              <h2 className={cn('gallery__title')}>Artworks</h2>
              {artistProfile?.paintings && artistProfile?.paintings?.length !== 0 ? (
                <Suspense fallback={<Preloader />}>
                  <div className={cn('gallery__row')}>
                    {isAuth && (
                      <ButtonLink
                        text="Add picture"
                        onClick={() => {
                          setAddEditPaintingOpened?.(true);
                          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                        }}
                      />
                    )}
                  </div>
                  <AdaptiveGrid>
                    {paintingsPage?.map((i, index) => (
                      <PaintingCard
                        key={i._id}
                        index={(currentPage - 1) * pageSize + index}
                        id={i._id}
                        name={i.name}
                        year={i.yearOfCreation}
                        picture={i?.image?.src}
                        onClick={openSlider}
                        setDeleteOpened={setDeleteOpened}
                        setAddEditPaintingOpened={setAddEditPaintingOpened}
                        setDeleteArtistOrPainting={setDeleteArtistOrPainting}
                        setAddOrEditPainting={setAddOrEditPainting}
                        setCurrentPaintingId={setCurrentPaintingId}
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
                      onClick={() => {
                        setAddEditPaintingOpened?.(true);
                        window.scroll({ left: 0, top: 0, behavior: 'smooth' });
                      }}
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
            <div className={cn('gallery__pagination')}>
              <Pagination
                currentPage={currentPage}
                siblingCount={1}
                totalCount={artistProfile?.paintings?.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistProfile;
