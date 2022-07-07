import React, { ChangeEvent, FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SelectItem.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type MultiselectProps = {
  title: string;
  id: string;
  name: string;
  addGenre: (name: string, id: string) => void;
  removeGenre: (id: string) => void;
};

const SelectItem: FC<MultiselectProps> = ({ title, id, name, addGenre, removeGenre }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <li
      className={cn('item', {
        'item--dt': theme === 'dark',
        'item--lt': theme === 'light',
      })}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value="yes"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked) addGenre(name, id);
          if (!e.target.checked) removeGenre(id);
        }}
      />
      <label htmlFor={id}>{title}</label>
    </li>
  );
};

export default SelectItem;
