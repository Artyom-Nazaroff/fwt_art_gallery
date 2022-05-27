import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthAndRegistration.module.scss';
import '../../App.scss';
import crossDT from '../../assets/dark-theme/auth-registration/cross.svg';
import crossLT from '../../assets/light-theme/auth-registration/cross.svg';
import authMainPic from '../../assets/common-files/auth-main-picture.jpg';
import registrationMainPic from '../../assets/common-files/registration-main-picture.jpg';
import Input from '../_UI/Input/Input';
import Button from '../_UI/Button/Button';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

export enum AuthOrRegistration {
  auth = 'auth',
  registration = 'registration',
}

type AuthAndRegistrationProps = {
  variant: AuthOrRegistration;
};

const AuthAndRegistration: FC<AuthAndRegistrationProps> = ({ variant }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn('wrapper', 'modalWindowWrapper')}>
      <div className={cn('contentInner')}>
        <div className={cn('picture')}>
          <img
            src={variant === AuthOrRegistration.auth ? authMainPic : registrationMainPic}
            alt="main-painting"
          />
        </div>
        <div
          className={cn('auth', {
            'auth--dt': theme === 'dark',
            'auth--lt': theme === 'light',
          })}
        >
          <div className={cn('auth__top')}>
            <div className={cn('auth__close')}>
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </div>
          </div>
          <h2 className={cn('auth__title')}>
            {variant === AuthOrRegistration.auth ? 'Welcome back' : 'Create your profile'}
          </h2>
          <div className={cn('auth__content')}>
            <form className={cn('auth__form')}>
              <div className={cn('auth__field')}>
                <Input id="email" type="email" label="Email" name="email" />
              </div>
              <div className={cn('auth__field')}>
                <Input id="password" type="password" label="Password" name="password" />
              </div>
              <div className={cn('auth__btn')}>
                <Button text={variant === AuthOrRegistration.auth ? 'Log in' : 'Sign up'} />
              </div>
            </form>
            <div className={cn('auth__text')}>
              {variant === AuthOrRegistration.auth ? (
                <span className={cn('auth__textVariant')}>
                  If you don't have an account yet, please{' '}
                  <a className={cn('auth__textLink')} href="https://google.com">
                    {' '}
                    sign up
                  </a>
                </span>
              ) : (
                <span className={cn('auth__textVariant')}>
                  If you already have an account, please{' '}
                  <a className={cn('auth__textLink')} href="https://google.com">
                    log in
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAndRegistration;
