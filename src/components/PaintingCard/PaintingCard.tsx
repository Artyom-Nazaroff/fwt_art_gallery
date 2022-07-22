import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './PaintingCard.module.scss';
import arrow from '../../assets/dark-theme/artist-profile/back-arrow-dt.svg';
import TextLink from '../_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

type ArtistProps = {
  id: string;
  name: string;
  year: string;
  picture: string;
};

const PaintingCard: FC<ArtistProps> = ({ id, name, year, picture }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <li
      className={cn('painting', {
        'painting--dt': theme === 'dark',
        'painting--lt': theme === 'light',
      })}
    >
      <div className={cn('painting__inner')}>
        <img src={`https://internship-front.framework.team/${picture}`} alt="painting" />
        <div className={cn('painting__info')}>
          <div className={cn('painting__name')}>{name}</div>
          <div className={cn('painting__dateOfCreation')}>{year}</div>
        </div>
        <div className={cn('painting__arrow')}>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </li>
  );
};

export default PaintingCard;
