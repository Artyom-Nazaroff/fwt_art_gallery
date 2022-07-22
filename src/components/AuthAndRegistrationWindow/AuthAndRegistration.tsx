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
  setVariant: (val: AuthOrRegistration) => void;
  setIsModalOpened: (val: boolean) => void;
};

const AuthAndRegistration: FC<AuthAndRegistrationProps> = ({
  variant,
  setVariant,
  setIsModalOpened,
}) => {
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
            <button
              type="button"
              className={cn('auth__close')}
              onClick={() => setIsModalOpened(false)}
            >
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </button>
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
                <span>
                  If you don't have an account yet, please{' '}
                  <button
                    className={cn('auth__textLink')}
                    type="button"
                    onClick={() => setVariant(AuthOrRegistration.registration)}
                  >
                    sign up
                  </button>
                </span>
              ) : (
                <span>
                  If you already have an account, please{' '}
                  <button
                    className={cn('auth__textLink')}
                    type="button"
                    onClick={() => setVariant(AuthOrRegistration.auth)}
                  >
                    log in
                  </button>
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
