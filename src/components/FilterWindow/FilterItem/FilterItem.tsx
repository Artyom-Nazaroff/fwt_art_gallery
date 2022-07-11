import React, { FC, useContext, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type FilterItemProps = {
  id: string;
  name: string;
  isItemsDeactivated: boolean;
  selectedGenres: string[];
  addGenreToList: (val: string) => void;
  removeGenreFromList: (val: string) => void;
  setIsItemsDeactivated: (val: boolean) => void;
};

const FilterItem: FC<FilterItemProps> = ({
  id,
  name,
  selectedGenres,
  addGenreToList,
  removeGenreFromList,
  isItemsDeactivated,
  setIsItemsDeactivated,
}) => {
  const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  useMemo(() => {
    if (selectedGenres.includes(id)) setIsItemSelected(true);
  }, []);

  useMemo(() => {
    if (isItemsDeactivated) setIsItemSelected(false);
  }, [isItemsDeactivated]);

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
        setIsItemsDeactivated(false);
        if (!isItemSelected) addGenreToList(id);
        if (isItemSelected) removeGenreFromList(id);
      }}
    >
      {name}
    </li>
  );
};

export default FilterItem;
