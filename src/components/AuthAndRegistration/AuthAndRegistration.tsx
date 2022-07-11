import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { ClientJS } from 'clientjs';
import Cookies from 'js-cookie';
import styles from './AuthAndRegistration.module.scss';
import '../../App.scss';
import crossDT from '../../assets/dark-theme/auth-registration/cross.svg';
import crossLT from '../../assets/light-theme/auth-registration/cross.svg';
import authMainPic from '../../assets/common-files/auth-main-picture.jpg';
import registrationMainPic from '../../assets/common-files/registration-main-picture.jpg';
import Input from '../_UI/Input/Input';
import Button from '../_UI/Button/Button';
import { ThemeContext } from '../../context/themeContext';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useInput } from '../../hooks/useInput';

const cn = classNames.bind(styles);

export enum AuthOrRegistration {
  auth = 'auth',
  registration = 'registration',
}

type AuthAndRegistrationProps = {
  variant: AuthOrRegistration;
  setVariant: (val: AuthOrRegistration) => void;
  setAuthOpened: (val: boolean) => void;
};

const AuthAndRegistration: FC<AuthAndRegistrationProps> = ({
  variant,
  setVariant,
  setAuthOpened,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isBtnDisabled } = useTypedSelector((state) => state.authRegistration);
  const { registerUser, authUser } = useActions();
  const navigate = useNavigate();

  const email = useInput('', { isEmpty: true, maxLength: 50, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isValidPassword: true });

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (variant === AuthOrRegistration.auth) {
      const client = new ClientJS();
      const fingerprint = `${client.getFingerprint()}`;
      Cookies.set('fingerprint', fingerprint);
      authUser(email.inputValue, password.inputValue, fingerprint);
      email.setInputValue('');
      password.setInputValue('');
      email.setDirty(false);
      password.setDirty(false);
      setAuthOpened(false);
      navigate('/new_art_gallery');
    }
    if (variant === AuthOrRegistration.registration) {
      const client = new ClientJS();
      const fingerprint = `${client.getFingerprint()}`;
      registerUser(email.inputValue, password.inputValue, fingerprint);
      email.setInputValue('');
      password.setInputValue('');
      email.setDirty(false);
      password.setDirty(false);
      setAuthOpened(false);
      navigate('/new_art_gallery');
    }
  };

  const closeWindow = () => {
    setAuthOpened(false);
    document.body.style.overflow = 'unset';
  };

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
            <button type="button" className={cn('auth__close')} onClick={() => closeWindow()}>
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </button>
          </div>
          <h2 className={cn('auth__title')}>
            {variant === AuthOrRegistration.auth ? 'Welcome back' : 'Create your profile'}
          </h2>
          <div className={cn('auth__content')}>
            <form className={cn('auth__form')}>
              <div className={cn('auth__field')}>
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                  value={email.inputValue}
                  changeHandler={email.onChange}
                  onBlur={email.onBlur}
                  errorMessage={email.errorMessage}
                />
              </div>
              <div className={cn('auth__field')}>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  value={password.inputValue}
                  changeHandler={password.onChange}
                  onBlur={password.onBlur}
                  errorMessage={password.errorMessage}
                />
              </div>
              <div className={cn('auth__btn')}>
                <Button
                  text={variant === AuthOrRegistration.auth ? 'Log in' : 'Sign up'}
                  isDisabled={isBtnDisabled || !email.inputValid || !password.inputValid}
                  onClick={clickHandler}
                />
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
