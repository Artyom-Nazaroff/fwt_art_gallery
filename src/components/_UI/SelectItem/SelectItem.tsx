import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SelectItem.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type MultiselectProps = {
  title: string;
  id: string;
  name: string;
};

const SelectItem: FC<MultiselectProps> = ({ title, id, name }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <li
      className={cn('item', {
        'item--dt': theme === 'dark',
        'item--lt': theme === 'light',
      })}
    >
      <input type="checkbox" id={id} name={name} value="yes" />
      <label htmlFor={id}>{title}</label>
    </li>
  );
};

export default SelectItem;
