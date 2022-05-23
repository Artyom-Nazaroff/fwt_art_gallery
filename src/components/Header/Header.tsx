import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import '../../App.scss';
import openDarkBurger from '../../assets/dark-theme/burger-menu/open-menu-dt.svg';
import darkThemeLogo from '../../assets/dark-theme/header/logo-dt.svg';
// import lightThemeLogo from '../../assets/logo-lt.svg';
import changeDarkTheme from '../../assets/dark-theme/header/change-theme-dt.svg';

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
