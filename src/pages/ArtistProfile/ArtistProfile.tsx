import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ArtistProfile.module.scss';
import '../../App.scss';
import Header from '../../components/Header/Header';
import arrowDT from '../../assets/dark-theme/artist-profile/return-arrow-dt.svg';
import arrowLT from '../../assets/light-theme/artist-profile/return-arrow-lt.svg';
import ArtistInfo from '../../components/ArtistInfo/ArtistInfo';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import Footer from '../../components/Footer/Footer';
import TextLink from '../../components/_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

const ArtistProfile = () => {
  const { theme } = useContext(ThemeContext);
  const { artists } = useTypedSelector((state) => state.artists);

  return (
    <div
      className={cn('wrapper', {
        'wrapper--dt': theme === 'dark',
        'wrapper--lt': theme === 'light',
      })}
    >
      <Header />
      <div className={cn('return')}>
        <div className={cn('return__container', 'container')}>
          <button className={cn('return__btn')} type="button">
            <img src={theme === 'dark' ? arrowDT : arrowLT} alt="" />
            <div className={cn('return__link')}>
              <TextLink text="back" />
            </div>
          </button>
        </div>
      </div>
      <ArtistInfo
        name="Ivan Aivazovsky"
        years="29 july 1817 – 2 may 1900"
        place="Feodosia, Russian Empire"
      />
      <div
        className={cn('gallery', {
          'gallery--dt': theme === 'dark',
          'gallery--lt': theme === 'light',
        })}
      >
        <div className={cn('gallery__container', 'container')}>
          <h2 className={cn('gallery__title')}>Artworks</h2>
          <AdaptiveGrid items={artists} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistProfile;
