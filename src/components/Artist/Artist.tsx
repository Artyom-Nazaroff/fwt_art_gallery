import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import picture from '../../assets/picture-example.jpg';
import arrow from '../../assets/artist-arrow.svg';
import TextLink from '../_UI/TextLink/TextLink';

const cn = classNames.bind(styles);

interface ArtistProps {
  name: string;
  years: string;
}

const Artist: FC<ArtistProps> = ({ name, years }) => {
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

export default Artist;
