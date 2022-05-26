import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Preloader.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type PreloaderPartProps = {
  num: number;
};

const PreloaderPart: FC<PreloaderPartProps> = ({ num }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <circle
      className={cn(`preloader__part${num}`)}
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="5"
      stroke={theme === 'dark' ? '#DEDEDE' : '#121212'}
    />
  );
};

export default PreloaderPart;
