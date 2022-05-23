import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button className={cn('btn', 'btn--dt')} type="button">
      <span>{text}</span>
    </button>
  );
};

export default Button;
