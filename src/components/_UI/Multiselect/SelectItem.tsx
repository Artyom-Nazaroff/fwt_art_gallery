import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Multiselect.module.scss';

const cn = classNames.bind(styles);

interface MultiselectProps {
  title: string;
  id: string;
  name: string;
}

const Multiselect: FC<MultiselectProps> = ({ title, id, name }) => {
  return (
    <li className={cn('select__item')}>
      <input type="checkbox" id={id} name={name} value="yes" />
      <label htmlFor={id}>{title}</label>
    </li>
  );
};

export default Multiselect;
