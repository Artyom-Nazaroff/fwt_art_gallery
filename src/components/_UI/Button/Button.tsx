import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={cn('btn', {
        'btn--dt': theme === 'dark',
        'btn--lt': theme === 'light',
      })}
      type="button"
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
