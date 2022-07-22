import React, { FC, useContext, useEffect, Suspense } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useMatch } from 'react-router-dom';
import styles from './ArtistProfile.module.scss';
import '../../App.scss';
import arrowDT from '../../assets/dark-theme/artist-profile/return-arrow-dt.svg';
import arrowLT from '../../assets/light-theme/artist-profile/return-arrow-lt.svg';
import ArtistInfo from '../../components/ArtistInfo/ArtistInfo';
import TextLink from '../../components/_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Preloader from '../../components/_UI/Preloader/Preloader';
import PaintingCard from '../../components/PaintingCard/PaintingCard';

const AdaptiveGrid = React.lazy(() => import('../../components/AdaptiveGrid/AdaptiveGrid'));

const cn = classNames.bind(styles);

const ArtistProfile: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { artistProfile, loading } = useTypedSelector((state) => state.artists);
  const match = useMatch('artists/static/:artistId');
  const { fetchArtistProfile } = useActions();

  useEffect(() => {
    fetchArtistProfile(match?.params.artistId);
  }, []);

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
          <div className={cn('return')}>
            <div className={cn('return__container', 'container')}>
              <NavLink to="/new_art_gallery">
                <button className={cn('return__btn')} type="button">
                  <img src={theme === 'dark' ? arrowDT : arrowLT} alt="" />
                  <div className={cn('return__link')}>
                    <TextLink text="back" />
                  </div>
                </button>
              </NavLink>
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
              <Suspense fallback={<Preloader />}>
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistProfile;
