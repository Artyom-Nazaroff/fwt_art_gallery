import React from 'react';
import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import picture from '../../assets/picture-example.jpg';
import arrow from '../../assets/artist-arrow.svg';

const cn = classNames.bind(styles);

const Artist = () => {
  return (
    <li className={cn('artist')}>
      <div className={cn('artist__inner')}>
        <img src={picture} alt="artist_portrait" />
        <div className={cn('artist__description')}>
          <div className={cn('artist__info')}>
            <div className={cn('artist__name')}>Jean-Honore Fragonard</div>
            <div className={cn('artist__datesOfLife')}>1732 - 1806</div>
          </div>
          <div className={cn('artist__arrow')}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Artist;
