import React from 'react';
import classNames from 'classnames/bind';
import styles from './Preloader.module.scss';
import PreloaderPart from './PreloaderPart';

const cn = classNames.bind(styles);

const Preloader = () => {
  return (
    <div className={cn('preloaderContainer')}>
      <svg className={cn('preloader')} viewBox="0 0 50 50">
        <PreloaderPart num={1} />
        <PreloaderPart num={2} />
        <PreloaderPart num={3} />
        <PreloaderPart num={4} />
      </svg>
    </div>
  );
};

export default Preloader;
