import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './BurgerMenu.module.scss';
import closeWindowDT from '../../assets/dark-theme/burger-menu/close-menu-dt.svg';
import closeWindowLT from '../../assets/light-theme/burger-menu/close-menu-lt.svg';
import changeThemeDT from '../../assets/dark-theme/header/change-theme-dt.svg';
import changeThemeLT from '../../assets/light-theme/header/change-theme-lt.svg';
import TextLink from '../_UI/TextLink/TextLink';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

type BurgerMenuProps = {
  isMenuOpened: boolean;
  setIsMenuOpened: (a: boolean) => void;
};

const BurgerMenu: FC<BurgerMenuProps> = ({ isMenuOpened, setIsMenuOpened }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
            onClick={() => setIsMenuOpened(!isMenuOpened)}
          >
            <img src={theme === 'dark' ? closeWindowDT : closeWindowLT} alt="" />
          </button>
        </div>
        <ul className={cn('burger__buttons')}>
          <li className={cn('burger__changeTheme')}>
            <button className={cn('burger__changeThemeBtn')} type="button" onClick={toggleTheme}>
              <img src={theme === 'dark' ? changeThemeDT : changeThemeLT} alt="" />
              <TextLink text="light theme" />
            </button>
          </li>
          <li className={cn('burger__btn')}>LOG IN</li>
          <li className={cn('burger__btn')}>SIGN UP</li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
