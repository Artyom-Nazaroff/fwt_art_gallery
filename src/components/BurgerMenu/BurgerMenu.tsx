import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './BurgerMenu.module.scss';
import closeWindowDT from '../../assets/dark-theme/burger-menu/close-menu-dt.svg';
import closeWindowLT from '../../assets/light-theme/burger-menu/close-menu-lt.svg';
import changeThemeDT from '../../assets/dark-theme/header/change-theme-dt.svg';
import changeThemeLT from '../../assets/light-theme/header/change-theme-lt.svg';
import TextLink from '../_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';
import { AuthOrRegistration } from '../AuthAndRegistrationWindow/AuthAndRegistration';
import MenuItem from '../_UI/MenuItem/MenuItem';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

type BurgerMenuProps = {
  setIsMenuOpened: (val: boolean) => void;
  openModalWindow: (val: AuthOrRegistration) => void;
};

const BurgerMenu: FC<BurgerMenuProps> = ({ setIsMenuOpened, openModalWindow }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logOutUser } = useActions();
  const { isAuth } = useTypedSelector((state) => state.authRegistration);

  const openBurgerModalWindow = (variant: AuthOrRegistration) => {
    openModalWindow(variant);
    setIsMenuOpened(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBurgerModalWindow = () => {
    setIsMenuOpened(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div
      className={cn('burger', {
        'burger--dt': theme === 'dark',
        'burger--lt': theme === 'light',
      })}
    >
      <div className={cn('burger__content')}>
        <div className={cn('burger__top')}>
          <button
            className={cn('burger__closeBtn')}
            type="button"
            onClick={() => closeBurgerModalWindow()}
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
            <MenuItem text="LOG OUT" isBurger removeAccount={logOutUser} />
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
