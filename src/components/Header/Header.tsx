import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { AuthOrRegistration } from '../AuthAndRegistration/AuthAndRegistration';
import MenuItem from '../_UI/MenuItem/MenuItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const cn = classNames.bind(styles);

type HeaderProps = {
  setAuthOpened: (val: boolean) => void;
  setAuthOrRegistration: (val: AuthOrRegistration) => void;
};

const Header: FC<HeaderProps> = ({ setAuthOpened, setAuthOrRegistration }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { logOutUser } = useActions();
  const navigate = useNavigate();

  const openModalWindow = (variant: AuthOrRegistration) => {
    setAuthOpened(true);
    setAuthOrRegistration(variant);
  };

  const logOut = () => {
    logOutUser();
    navigate('/new_art_gallery');
  };

  return (
    <>
      <BurgerMenu
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        openModalWindow={openModalWindow}
      />
      <header
        className={cn('header', {
          'header--dt': theme === 'dark',
          'header--lt': theme === 'light',
        })}
      >
        <div className={cn('header__container', 'container')}>
          <NavLink to="/new_art_gallery">
            <div className={cn('header__logo')}>
              <img src={theme === 'dark' ? logoDT : logoLT} alt="" />
            </div>
          </NavLink>
          <button
            className={cn('header__burger')}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            type="button"
          >
            <img src={theme === 'dark' ? openBurgerDT : openBurgerLT} alt="" />
          </button>
          <div className={cn('header__buttons')}>
            {isAuth ? (
              <MenuItem text="LOG OUT" removeAccount={logOut} isBurger={false} />
            ) : (
              <>
                <MenuItem
                  text="LOG IN"
                  variant={AuthOrRegistration.auth}
                  setAccount={openModalWindow}
                  isBurger={false}
                />
                <MenuItem
                  text="SIGN UP"
                  variant={AuthOrRegistration.registration}
                  setAccount={openModalWindow}
                  isBurger={false}
                />
              </>
            )}
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
