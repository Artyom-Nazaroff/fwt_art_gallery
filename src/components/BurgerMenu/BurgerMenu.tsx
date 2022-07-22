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

const cn = classNames.bind(styles);

type BurgerMenuProps = {
  setIsMenuOpened: (val: boolean) => void;
  openModalWindow: (val: AuthOrRegistration) => void;
};

const BurgerMenu: FC<BurgerMenuProps> = ({ setIsMenuOpened, openModalWindow }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const openBurgerModalWindow = (variant: AuthOrRegistration) => {
    openModalWindow(variant);
    setIsMenuOpened(false);
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
            onClick={() => setIsMenuOpened(false)}
          >
            <img src={theme === 'dark' ? closeWindowDT : closeWindowLT} alt="" />
          </button>
        </div>
        <ul className={cn('burger__buttons')}>
          <li className={cn('burger__changeTheme')}>
            <button className={cn('burger__changeThemeBtn')} type="button" onClick={toggleTheme}>
              <img src={theme === 'dark' ? changeThemeDT : changeThemeLT} alt="" />
              <TextLink text={theme === 'dark' ? 'light theme' : 'dark theme'} />
            </button>
          </li>
          <li className={cn('burger__li')}>
            <button
              className={cn('burger__btn')}
              type="button"
              onClick={() => openBurgerModalWindow(AuthOrRegistration.auth)}
            >
              LOG IN
            </button>
          </li>
          <li className={cn('burger__li')}>
            <button
              className={cn('burger__btn')}
              type="button"
              onClick={() => openBurgerModalWindow(AuthOrRegistration.registration)}
            >
              SIGN UP
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
