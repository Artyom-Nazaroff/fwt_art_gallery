import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FilterWindow.module.scss';
import { ThemeContext } from '../../context/themeContext';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import closeWindowDT from '../../assets/dark-theme/main-page/cross-dt.svg';
import plusDT from '../../assets/dark-theme/main-page/plus-dt.svg';
import minusDT from '../../assets/dark-theme/main-page/minus-dt.svg';
import closeWindowLT from '../../assets/light-theme/main-page/cross-lt.svg';
import plusLT from '../../assets/light-theme/main-page/plus-lt.svg';
import minusLT from '../../assets/light-theme/main-page/minus-lt.svg';
import MenuItem from '../_UI/MenuItem/MenuItem';
import TextLink from '../_UI/TextLink/TextLink';
import { Genre } from '../../store/artists/artistsTypes';
import FilterItem from './FilterItem/FilterItem';

const cn = classNames.bind(styles);

type FilterWindowProps = {
  setIsFilterWindowOpened: (val: boolean) => void;
  addGenreToList: (val: string) => void;
  removeGenreFromList: (val: string) => void;
};

const FilterWindow: FC<FilterWindowProps> = ({
  setIsFilterWindowOpened,
  addGenreToList,
  removeGenreFromList,
}) => {
  const [isGenresOpened, setIsGenresOpened] = useState<boolean>(true);
  const [isSortByOpened, setIsSortByOpened] = useState<boolean>(true);
  const [selectedGenresAmount, setSelectedGenresAmount] = useState<number>(0);
  const { theme } = useContext(ThemeContext);
  const { logOutUser } = useActions();
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { artists, genres } = useTypedSelector((state) => state.artists);

  const currentGenresList = () => {
    const currentGenresID: string[] = [];
    artists.forEach((item) =>
      item.genres.forEach((i) => {
        if (!currentGenresID.includes(i)) currentGenresID.push(i);
      })
    );
    const genresList: Array<Genre> = [];
    currentGenresID.forEach((item) => {
      genres.forEach((i) => {
        if (i._id === item) genresList.push(i);
      });
    });
    return genresList;
  };

  return (
    <div
      className={cn('filter', {
        'filter--dt': theme === 'dark',
        'filter--lt': theme === 'light',
      })}
    >
      <div className={cn('filter__content')}>
        <div className={cn('filter__top')}>
          <button
            className={cn('filter__closeBtn')}
            type="button"
            onClick={() => setIsFilterWindowOpened(false)}
          >
            <img src={theme === 'dark' ? closeWindowDT : closeWindowLT} alt="" />
          </button>
        </div>
        <div className={cn('filter__categories')}>
          <div className={cn('filter__menuItem', { 'filter__genres--active': isGenresOpened })}>
            <div className={cn('filter__genresMenuItem')}>
              <span onClick={() => setIsGenresOpened(!isGenresOpened)} role="presentation">
                <MenuItem text="Genres" isFilterMenu />
              </span>
              {selectedGenresAmount > 0 && (
                <span className={cn('filter__genresAmount')}>({selectedGenresAmount})</span>
              )}
            </div>
            <button
              className={cn('filter__menuItemPlus')}
              type="button"
              onClick={() => setIsGenresOpened(!isGenresOpened)}
            >
              {isGenresOpened ? (
                <img src={theme === 'dark' ? minusDT : minusLT} alt="" />
              ) : (
                <img src={theme === 'dark' ? plusDT : plusLT} alt="" />
              )}
            </button>
          </div>
          <ul
            className={cn('filter__genresItems', { 'filter__genresItems--active': isGenresOpened })}
          >
            {currentGenresList().map((item) => (
              <FilterItem
                key={item._id}
                id={item._id}
                name={item.name}
                selectedGenresAmount={selectedGenresAmount}
                setSelectedGenresAmount={setSelectedGenresAmount}
                addGenreToList={addGenreToList}
                removeGenreFromList={removeGenreFromList}
              />
            ))}
          </ul>
          <div className={cn('filter__menuItem', { 'filter__sortBy--active': isSortByOpened })}>
            <span onClick={() => setIsSortByOpened(!isSortByOpened)} role="presentation">
              <MenuItem text="Sort by" isFilterMenu />
            </span>
            <button
              className={cn('filter__menuItemPlus')}
              type="button"
              onClick={() => setIsSortByOpened(!isSortByOpened)}
            >
              {isSortByOpened ? (
                <img src={theme === 'dark' ? minusDT : minusLT} alt="" />
              ) : (
                <img src={theme === 'dark' ? plusDT : plusLT} alt="" />
              )}
            </button>
          </div>
          <ul
            className={cn('filter__sortByItems', { 'filter__sortByItems--active': isSortByOpened })}
          >
            <li className={cn('filter__sortByItem')}>Recently added</li>
            <li className={cn('filter__sortByItem')}>A-Z</li>
            <li className={cn('filter__sortByItem')}>Z-A</li>
          </ul>
        </div>
        <div className={cn('filter__bottom')}>
          <TextLink text="Show the results" />
          <TextLink text="Clear" />
        </div>
      </div>
    </div>
  );
};

export default FilterWindow;
