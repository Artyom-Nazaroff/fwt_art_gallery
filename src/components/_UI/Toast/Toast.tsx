import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import crossDT from '../../../assets/dark-theme/delete-popup/close-cross.svg';
import crossLT from '../../../assets/light-theme/delete-popup/close-cross.svg';
import error from '../../../assets/common-files/error-sign.svg';

const cn = classNames.bind(styles);

type ToastProps = {
  text: string;
  setErrorOpened: (val: boolean) => void;
};

const Toast: FC<ToastProps> = ({ text, setErrorOpened }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('toast', {
        'toast--dt': theme === 'dark',
        'toast--lt': theme === 'light',
      })}
    >
      <div className={cn('toast__content')}>
        <p className={cn('toast__error')}>
          <span className={cn('toast__errorSignDesktop')}>
            <img src={error} alt="" />
          </span>
          Error!
        </p>
        <p className={cn('toast__errorMessage')}>
          <span className={cn('toast__errorSignMobile')}>
            <img src={error} alt="" />
          </span>
          {text}
        </p>
      </div>
      <div className={cn('toast__close')} role="presentation" onClick={() => setErrorOpened(false)}>
        <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
      </div>
    </div>
  );
};

export default Toast;