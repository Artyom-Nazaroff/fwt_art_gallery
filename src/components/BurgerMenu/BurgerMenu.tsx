import React from 'react';
import classNames from 'classnames/bind';
import styles from './BurgerMenu.module.scss';
import closeDarkTheme from '../../assets/dark-theme/burger-menu/close-menu-dt.svg';
import changeDarkTheme from '../../assets/dark-theme/header/change-theme-dt.svg';
import TextLink from '../_UI/TextLink/TextLink';

const cn = classNames.bind(styles);

const BurgerMenu = () => {
  return (
    <div className={cn('burger')}>
      <div className={cn('burger__content')}>
        <div className={cn('burger__top')}>
          <div className={cn('burger__closeBtn')}>
            <img src={closeDarkTheme} alt="close" />
          </div>
        </div>
        <ul className={cn('burger__buttons')}>
          <li className={cn('burger__changeTheme')}>
            <img src={changeDarkTheme} alt="sun" />
            <TextLink text="light theme" />
          </li>
          <li className={cn('burger__btn')}>LOG IN</li>
          <li className={cn('burger__btn')}>SIGN UP</li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
