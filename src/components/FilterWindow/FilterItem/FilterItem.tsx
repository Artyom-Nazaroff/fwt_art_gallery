import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type FilterItemProps = {
  id: string;
  name: string;
  selectedGenresAmount: number;
  setSelectedGenresAmount: (val: number) => void;
  addGenreToList: (val: string) => void;
  removeGenreFromList: (val: string) => void;
};

const FilterItem: FC<FilterItemProps> = ({
  id,
  name,
  selectedGenresAmount,
  setSelectedGenresAmount,
  addGenreToList,
  removeGenreFromList,
}) => {
  const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  return (
    <li
      className={cn('filterItem', {
        'filterItem--dt': theme === 'dark',
        'filterItem--lt': theme === 'light',
        'filterItem--active': isItemSelected,
      })}
      role="presentation"
      onClick={() => {
        setIsItemSelected?.(!isItemSelected);
        if (!isItemSelected) {
          setSelectedGenresAmount(selectedGenresAmount + 1);
          addGenreToList(id);
        }
        if (isItemSelected) {
          setSelectedGenresAmount(selectedGenresAmount - 1);
          removeGenreFromList(id);
        }
      }}
    >
      {name}
    </li>
  );
};

export default FilterItem;
