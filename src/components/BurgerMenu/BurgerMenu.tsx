import React from 'react';
import classNames from 'classnames/bind';
import styles from './BurgerMenu.module.scss';
import closeDarkTheme from '../../assets/burger-menu/close-menu-dark-theme.svg';
import changeDarkTheme from '../../assets/dark-theme-change-theme.svg';
import TextLink from '../_UI/TextLink/TextLink';
// import closeLightTheme from '../../assets/burger-menu/close-menu-light-theme.svg';

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
