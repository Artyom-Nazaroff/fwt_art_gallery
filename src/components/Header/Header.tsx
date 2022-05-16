import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import '../../App.scss';
import openDarkBurger from '../../assets/burger-menu/open-menu-dark-theme.svg';
// import openLightBurger from '../../assets/burger-menu/open-menu-light-theme.svg';
import darkThemeLogo from '../../assets/logo-dark-theme.svg';
// import lightThemeLogo from '../../assets/logo-light-theme.svg';
import changeDarkTheme from '../../assets/dark-theme-change-theme.svg';

const cn = classNames.bind(styles);

const Header: FC = () => {
  return (
    <header className={cn('header')}>
      <div className={cn('header__container', 'container')}>
        <div className={cn('header__logo')}>
          <img src={darkThemeLogo} alt="logo" />
        </div>
        <div className={cn('header__burger')}>
          <img src={openDarkBurger} alt="menu" />
        </div>
        <div className={cn('header__buttons')}>
          <button type="button">LOG IN</button>
          <button type="button">SIGN UP</button>
          <div className={cn('header__changeTheme')}>
            <img src={changeDarkTheme} alt="sun" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
