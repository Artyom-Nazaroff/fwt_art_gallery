import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import errorSign from '../../../assets/common-files/error-sign.svg';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type InputProps = {
  id: string;
  label: string;
  name: string;
  type: string;
  value: string;
  changeHandler: (val: string) => void;
  errorMessage?: string;
  placeholder?: string;
  onBlur?: () => void;
};

const Input: FC<InputProps> = ({
  id,
  type,
  label,
  name,
  errorMessage,
  placeholder,
  value,
  changeHandler,
  onBlur,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('input', {
        'input--dt': theme === 'dark',
        'input--lt': theme === 'light',
        'input--err': errorMessage && errorMessage?.length > 0,
      })}
    >
      <label className={cn('input__label')} htmlFor={id}>
        {label}
      </label>
      <input
        className={cn('input__field')}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e.target.value)}
        onBlur={() => onBlur?.()}
      />
      <div className={cn('input__error')}>
        <img src={errorSign} alt="" />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default Input;
