import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import { AuthOrRegistration } from '../../AuthAndRegistration/AuthAndRegistration';

const cn = classNames.bind(styles);

type ButtonProps = {
  text: string;
  isBurger?: boolean;
  isFilterMenu?: boolean;
  variant?: AuthOrRegistration;
  setAccount?: (val: AuthOrRegistration) => void;
  removeAccount?: () => void;
};

const MenuItem: FC<ButtonProps> = ({
  text,
  variant,
  setAccount,
  removeAccount,
  isBurger,
  isFilterMenu,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={cn('btn', {
        'btn--burger': isBurger,
        'btn--filter': isFilterMenu,
        'btn--dt': theme === 'dark',
        'btn--lt': theme === 'light',
      })}
      type="button"
      onClick={() => {
        if (variant && setAccount) setAccount(variant);
        if (removeAccount) removeAccount();
      }}
    >
      {text}
    </button>
  );
};

export default MenuItem;
