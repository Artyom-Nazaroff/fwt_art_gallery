import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './AuthAndRegistration.module.scss';
import '../../App.scss';
import crossDT from '../../assets/dark-theme/auth-registration/cross.svg';
import authMainPic from '../../assets/common-files/auth-main-picture.jpg';
import registrationMainPic from '../../assets/common-files/registration-main-picture.jpg';
import Input from '../_UI/Input/Input';
import Button from '../_UI/Button/Button';

const cn = classNames.bind(styles);

export enum AuthOrRegistration {
  // eslint-disable-next-line no-unused-vars
  auth = 'auth',
  // eslint-disable-next-line no-unused-vars
  registration = 'registration',
}

interface AuthAndRegistrationProps {
  variant: AuthOrRegistration;
}

const AuthAndRegistration: FC<AuthAndRegistrationProps> = ({ variant }) => {
  return (
    <div className={cn('wrapper', 'modalWindowWrapper')}>
      <div className={cn('contentInner')}>
        <div className={cn('picture')}>
          <img
            src={variant === AuthOrRegistration.auth ? authMainPic : registrationMainPic}
            alt=""
          />
        </div>
        <div className={cn('auth')}>
          <div className={cn('auth__top')}>
            <div className={cn('auth__close')}>
              <img src={crossDT} alt="" />
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
                <span>
                  If you don't have an account yet, please <a href="https://google.com"> sign up</a>
                </span>
              ) : (
                <span>
                  If you already have an account, please <a href="https://google.com">log in</a>
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
