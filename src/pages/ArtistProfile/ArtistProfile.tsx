import React from 'react';
import classNames from 'classnames/bind';
import styles from './ArtistProfile.module.scss';
import '../../App.scss';
import Header from '../../components/Header/Header';
import arrowDarkTheme from '../../assets/artist-profile/return-arrow-dark-theme.svg';
import ArtistInfo from '../../components/ArtistInfo/ArtistInfo';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import Footer from '../../components/Footer/Footer';
import TextLink from '../../components/_UI/TextLink/TextLink';
// import artist from '../../assets/Artist-profile/Aivazovsky.jpg';

const cn = classNames.bind(styles);

const ArtistProfile = () => {
  return (
    <div className={cn('wrapper')}>
      <Header />
      <div className={cn('return')}>
        <div className={cn('return__container', 'container')}>
          <div className={cn('return__btn')}>
            <img src={arrowDarkTheme} alt="arrow" />
            <div className={cn('return__link')}>
              <TextLink text="back" />
            </div>
          </div>
        </div>
      </div>
      <ArtistInfo />
      <div className={cn('gallery')}>
        <div className={cn('gallery__container', 'container')}>
          <h2 className={cn('gallery__title')}>Artworks</h2>
          <AdaptiveGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistProfile;
