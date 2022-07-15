import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ScrollUpButton.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import arrowDT from '../../../assets/dark-theme/_UI/ScrollUpButton/arrow-dt.svg';
import arrowLT from '../../../assets/light-theme/_UI/ScrollUpButton/arrow-lt.svg';

const cn = classNames.bind(styles);

type ScrollUpButtonProps = {
  visibleScrollBtn: boolean;
};

const ScrollUpButton: FC<ScrollUpButtonProps> = ({ visibleScrollBtn }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <span
      className={cn('btn', {
        'btn--dt': theme === 'dark',
        'btn--lt': theme === 'light',
        'btn--active': visibleScrollBtn,
      })}
      role="presentation"
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
    >
      <img src={theme === 'dark' ? arrowDT : arrowLT} alt="" />
    </span>
  );
};

export default ScrollUpButton;
