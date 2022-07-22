import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './ArtistCard.module.scss';
import arrow from '../../assets/dark-theme/artist-profile/back-arrow-dt.svg';
import TextLink from '../_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';
import { Painting } from '../../store/artists/artistsTypes';

const cn = classNames.bind(styles);
const url = process.env.REACT_APP_BASE_URL;

type ArtistProps = {
  id: string;
  name: string;
  years: string;
  picture: Painting['image'];
};

const ArtistCard: FC<ArtistProps> = ({ id, name, years, picture }) => {
  const { theme } = useContext(ThemeContext);

  const datesOfLife = years
    .split(' – ')
    .map((i) => i.slice(-4))
    .join(' – ');

  return (
    <li
      className={cn('artist', {
        'artist--dt': theme === 'dark',
        'artist--lt': theme === 'light',
      })}
    >
      <NavLink to={`/artists/static/${id}`}>
        <div className={cn('artist__modalWindow')}>
          <TextLink text="know more" />
        </div>
        <div className={cn('artist__inner')}>
          <picture>
            <source srcSet={`${url}${picture.webp}`} media="(min-width: 320px)" />
            <source srcSet={`${url}${picture.src}`} media="(min-width: 320px)" />
            <source srcSet={`${url}${picture.webp2x}`} media="(min-width: 768px)" />
            <source srcSet={`${url}${picture.src2x}`} media="(min-width: 768px)" />
            <img src={`${url}${picture.original}`} alt="artist_portrait" />
          </picture>
          <div className={cn('artist__info')}>
            <div className={cn('artist__name')}>{name}</div>
            <div className={cn('artist__datesOfLife')}>{datesOfLife}</div>
          </div>
          <div className={cn('artist__arrow')}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default ArtistCard;
