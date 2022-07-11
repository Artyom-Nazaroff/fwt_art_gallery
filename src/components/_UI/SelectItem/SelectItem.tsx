import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SelectItem.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type MultiselectProps = {
  title: string;
  id: string;
  name: string;
  uncheckedItem: string;
  addGenre: (name: string, id: string) => void;
  removeGenre: (id: string) => void;
};

const SelectItem: FC<MultiselectProps> = ({
  title,
  id,
  name,
  uncheckedItem,
  addGenre,
  removeGenre,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { theme } = useContext(ThemeContext);

  useMemo(() => {
    if (uncheckedItem === id) setIsChecked(false);
  }, [uncheckedItem]);

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
        checked={isChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.checked) {
            setIsChecked(true);
            addGenre(name, id);
          }
          if (!e.target.checked) {
            setIsChecked(false);
            removeGenre(id);
          }
        }}
      />
      <label htmlFor={id}>{title}</label>
    </li>
  );
};

export default SelectItem;
