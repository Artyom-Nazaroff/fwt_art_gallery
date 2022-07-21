import React, { FC, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import '../../App.scss';
import openBurgerDT from '../../assets/dark-theme/burger-menu/open-menu-dt.svg';
import openBurgerLT from '../../assets/light-theme/burger-menu/open-menu-lt.svg';
import logoDT from '../../assets/dark-theme/header/logo-dt.svg';
import logoLT from '../../assets/light-theme/header/logo-lt.svg';
import changeThemeDT from '../../assets/dark-theme/header/change-theme-dt.svg';
import changeThemeLT from '../../assets/light-theme/header/change-theme-lt.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

type User = {
  name: string;
};

type HeaderProps = {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
};

const Header: FC<HeaderProps> = ({ user, onLogin, onLogout, onCreateAccount }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {isMenuOpened && <BurgerMenu isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />}
      <header
        className={cn('header', {
          'header--dt': theme === 'dark',
          'header--lt': theme === 'light',
        })}
      >
        <div className={cn('header__container', 'container')}>
          <div className={cn('header__logo')}>
            <img src={theme === 'dark' ? logoDT : logoLT} alt="" />
          </div>
          <button
            className={cn('header__burger')}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            type="button"
          >
            <img src={theme === 'dark' ? openBurgerDT : openBurgerLT} alt="" />
          </button>
          <div className={cn('header__buttons')}>
            <button type="button">LOG IN</button>
            <button type="button">SIGN UP</button>
            <button className={cn('header__changeTheme')} type="button" onClick={toggleTheme}>
              <img src={theme === 'dark' ? changeThemeDT : changeThemeLT} alt="" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
