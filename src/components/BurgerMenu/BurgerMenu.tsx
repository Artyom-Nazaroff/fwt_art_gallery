import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BurgerMenu.module.scss';
import closeWindowDT from '../../assets/dark-theme/burger-menu/close-menu-dt.svg';
import closeWindowLT from '../../assets/light-theme/burger-menu/close-menu-lt.svg';
import changeThemeDT from '../../assets/dark-theme/header/change-theme-dt.svg';
import changeThemeLT from '../../assets/light-theme/header/change-theme-lt.svg';
import TextLink from '../_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';
import { AuthOrRegistration } from '../AuthAndRegistration/AuthAndRegistration';
import MenuItem from '../_UI/MenuItem/MenuItem';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

type BurgerMenuProps = {
  isMenuOpened: boolean;
  setIsMenuOpened: (val: boolean) => void;
  openModalWindow: (val: AuthOrRegistration) => void;
};

const BurgerMenu: FC<BurgerMenuProps> = ({ isMenuOpened, setIsMenuOpened, openModalWindow }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logOutUser } = useActions();
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const navigate = useNavigate();

  const openBurgerModalWindow = (variant: AuthOrRegistration) => {
    openModalWindow(variant);
    setIsMenuOpened(false);
  };

  const logOut = () => {
    logOutUser();
    navigate('/new_art_gallery');
  };

  return (
    <div
      className={cn('burger', {
        'burger--dt': theme === 'dark',
        'burger--lt': theme === 'light',
        'burger--opened': isMenuOpened,
      })}
    >
      <div className={cn('burger__content', { 'burger__content--opened': isMenuOpened })}>
        <div className={cn('burger__top')}>
          <button
            className={cn('burger__closeBtn')}
            type="button"
            onClick={() => setIsMenuOpened(false)}
          >
            <img src={theme === 'dark' ? closeWindowDT : closeWindowLT} alt="" />
          </button>
        </div>
        <div className={cn('burger__buttons')}>
          <button className={cn('burger__changeThemeBtn')} type="button" onClick={toggleTheme}>
            <img src={theme === 'dark' ? changeThemeDT : changeThemeLT} alt="" />
            <TextLink text={theme === 'dark' ? 'light theme' : 'dark theme'} />
          </button>
          {isAuth ? (
            <MenuItem text="LOG OUT" isBurger removeAccount={logOut} />
          ) : (
            <>
              <MenuItem
                text="LOG IN"
                isBurger
                setAccount={openBurgerModalWindow}
                variant={AuthOrRegistration.auth}
              />
              <MenuItem
                text="SIGN UP"
                isBurger
                setAccount={openBurgerModalWindow}
                variant={AuthOrRegistration.registration}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
