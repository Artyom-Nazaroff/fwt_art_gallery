import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';
import errorSign from '../../../assets/common-files/error-sign.svg';

const cn = classNames.bind(styles);

interface TextareaProps {
  id: string;
  label: string;
  name: string;
}

const Textarea: FC<TextareaProps> = ({ id, label, name }) => {
  return (
    <div className={cn('textarea', 'textarea--dt')}>
      <label className={cn('textarea__label')} htmlFor={id}>
        {label}
      </label>
      <textarea className={cn('textarea__field')} id={id} name={name} />
      <div className={cn('textarea__error')}>
        <img src={errorSign} alt="" />
        <span>This is an error message!</span>
      </div>
    </div>
  );
};

export default Textarea;
