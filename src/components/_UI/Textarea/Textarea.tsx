import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';
import errorSign from '../../../assets/common-files/error-sign.svg';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

interface TextareaProps {
  id: string;
  label: string;
  name: string;
  value: string;
  setValue: (val: string) => void;
  error?: string;
}

const Textarea: FC<TextareaProps> = ({ id, label, name, value, setValue, error }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('textarea', {
        'textarea--dt': theme === 'dark',
        'textarea--lt': theme === 'light',
      })}
    >
      <label className={cn('textarea__label')} htmlFor={id}>
        {label}
      </label>
      <textarea
        className={cn('textarea__field')}
        id={id}
        name={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
      />
      <div className={cn('textarea__error')}>
        <img src={errorSign} alt="" />
        <span>{error}</span>
      </div>
    </div>
  );
};

export default Textarea;
