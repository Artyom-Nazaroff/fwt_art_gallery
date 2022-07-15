import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FilterWindow.module.scss';
import { ThemeContext } from '../../context/themeContext';
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
import { setQueryStringParams } from '../../helpers/helpers';
import { useActions } from '../../hooks/useActions';

const cn = classNames.bind(styles);

type FilterWindowProps = {
  page: number;
  perPage: number;
  selectedGenres: string[];
  isFilterWindowOpened: boolean;
  setSearchName: (val: string) => void;
  setSelectedGenres: (val: string[]) => void;
  setOrderBy: (val: 'asc' | 'desc' | null) => void;
  setIsFilterWindowOpened: (val: boolean) => void;
  addGenreToList: (val: string) => void;
  removeGenreFromList: (val: string) => void;
  fetchSortedArtists: () => void;
};

const FilterWindow: FC<FilterWindowProps> = ({
  page,
  perPage,
  selectedGenres,
  isFilterWindowOpened,
  setIsFilterWindowOpened,
  addGenreToList,
  setOrderBy,
  setSearchName,
  setSelectedGenres,
  removeGenreFromList,
  fetchSortedArtists,
}) => {
  const [isGenresOpened, setIsGenresOpened] = useState<boolean>(false);
  const [isSortByOpened, setIsSortByOpened] = useState<boolean>(false);
  const [isItemsDeactivated, setIsItemsDeactivated] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { artists, genres } = useTypedSelector((state) => state.artists);
  const { fetchArtists } = useActions();

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

  const clearFilters = () => {
    setIsItemsDeactivated(true);
    setSearchName('');
    setSelectedGenres([]);
    setOrderBy(null);
    setQueryStringParams({ searchName: '', selectedGenres: [], perPage, page, orderBy: null });
    fetchArtists(perPage, page, '', [], null);
    setIsFilterWindowOpened(false);
  };

  const findArtists = () => {
    fetchSortedArtists();
    setIsFilterWindowOpened(false);
  };

  return (
    <div
      className={cn('filter', {
        'filter--dt': theme === 'dark',
        'filter--lt': theme === 'light',
        'filter--opened': isFilterWindowOpened,
      })}
      role="presentation"
      onClick={() => setIsFilterWindowOpened(false)}
    >
      <div
        className={cn('filter__content', { 'filter__content--opened': isFilterWindowOpened })}
        role="presentation"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
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
              {selectedGenres.length > 0 && (
                <span className={cn('filter__genresAmount')}>({selectedGenres.length})</span>
              )}
            </div>
            <span
              className={cn('filter__menuItemPlus', {
                filter__plusDt: !isGenresOpened && theme === 'dark',
                filter__plusLt: !isGenresOpened && theme === 'light',
                filter__minusDt: isGenresOpened && theme === 'dark',
                filter__minusLt: isGenresOpened && theme === 'light',
              })}
              role="presentation"
              onClick={() => setIsGenresOpened(!isGenresOpened)}
            />
          </div>
          <ul
            className={cn('filter__genresItems', { 'filter__genresItems--active': isGenresOpened })}
          >
            {currentGenresList().map((item) => (
              <FilterItem
                key={item._id}
                id={item._id}
                name={item.name}
                selectedGenres={selectedGenres}
                addGenreToList={addGenreToList}
                removeGenreFromList={removeGenreFromList}
                isItemsDeactivated={isItemsDeactivated}
                setIsItemsDeactivated={setIsItemsDeactivated}
              />
            ))}
          </ul>
          <div className={cn('filter__menuItem', { 'filter__sortBy--active': isSortByOpened })}>
            <span onClick={() => setIsSortByOpened(!isSortByOpened)} role="presentation">
              <MenuItem text="Sort by" isFilterMenu />
            </span>
            <span
              className={cn('filter__menuItemPlus', {
                filter__plusDt: !isSortByOpened && theme === 'dark',
                filter__plusLt: !isSortByOpened && theme === 'light',
                filter__minusDt: isSortByOpened && theme === 'dark',
                filter__minusLt: isSortByOpened && theme === 'light',
              })}
              role="presentation"
              onClick={() => setIsSortByOpened(!isSortByOpened)}
            />
          </div>
          <div
            className={cn('filter__sortByItems', { 'filter__sortByItems--active': isSortByOpened })}
          >
            <div className={cn('filter__sortByItem')}>
              <input type="radio" id="recentlyAdded" name="sortBy" />
              <label htmlFor="recentlyAdded">Recently added</label>
            </div>
            <div className={cn('filter__sortByItem')}>
              <input type="radio" id="asc" name="sortBy" />
              <label htmlFor="asc" role="presentation" onClick={() => setOrderBy('asc')}>
                A-Z
              </label>
            </div>
            <div className={cn('filter__sortByItem')}>
              <input type="radio" id="desc" name="sortBy" />
              <label htmlFor="desc" role="presentation" onClick={() => setOrderBy('desc')}>
                Z-A
              </label>
            </div>
          </div>
        </div>
        <div className={cn('filter__bottom')}>
          <TextLink text="Show the results" onClick={findArtists} />
          <TextLink text="Clear" onClick={clearFilters} />
        </div>
      </div>
    </div>
  );
};

export default FilterWindow;
