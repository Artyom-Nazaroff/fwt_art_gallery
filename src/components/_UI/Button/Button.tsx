import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

const Button: FC = () => {
  return (
    <button className={cn('btn', 'btn--not-mobile', 'btn--black')} type="button">
      <span>LOG IN</span>
    </button>
  );
};

export default Button;
