import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './ArtistCard.module.scss';
import picture from '../../assets/common-files/picture-example.jpg';
import arrow from '../../assets/dark-theme/artist-profile/back-arrow-dt.svg';
import TextLink from '../_UI/TextLink/TextLink';

const cn = classNames.bind(styles);

interface ArtistProps {
  name: string;
  years: string;
}

const ArtistCard: FC<ArtistProps> = ({ name, years }) => {
  return (
    <li className={cn('artist')}>
      <div className={cn('artist__modalWindow')}>
        <TextLink text="know more" />
      </div>
      <div className={cn('artist__inner')}>
        <img src={picture} alt="artist_portrait" />
        <div className={cn('artist__info')}>
          <div className={cn('artist__name')}>{name}</div>
          <div className={cn('artist__datesOfLife')}>{years}</div>
        </div>
        <div className={cn('artist__arrow')}>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </li>
  );
};

export default ArtistCard;
