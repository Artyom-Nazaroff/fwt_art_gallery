import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import errorSign from '../../../assets/common-files/error-sign.svg';

const cn = classNames.bind(styles);

interface InputProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ id, type, label, name, placeholder }) => {
  return (
    <div className={cn('input', 'input--dt')}>
      <label className={cn('input__label')} htmlFor={id}>
        {label}
      </label>
      <input
        className={cn('input__field')}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
      <div className={cn('input__error')}>
        <img src={errorSign} alt="" />
        <span>This is an error message!</span>
      </div>
    </div>
  );
};

export default Input;
