import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import errorSign from '../../../assets/common-files/error-sign.svg';
import searchIconDT from '../../../assets/dark-theme/_UI/Search/search-icon.svg';
import searchIconLT from '../../../assets/light-theme/_UI/Search/search-icon.svg';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type SearchProps = {
  id: string;
  value: string;
  setSearchStringValue: (val: string) => void;
  fetchSortedArtists: () => void;
};

const Search: FC<SearchProps> = ({ id, value, setSearchStringValue, fetchSortedArtists }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('search', {
        'search--dt': theme === 'dark',
        'search--lt': theme === 'light',
      })}
    >
      <div className={cn('search__field')}>
        <label
          className={cn('search__label')}
          htmlFor={id}
          role="presentation"
          onClick={() => fetchSortedArtists()}
        >
          <img src={theme === 'dark' ? searchIconDT : searchIconLT} alt="" />
        </label>
        <input
          className={cn('search__input')}
          type="search"
          id={id}
          placeholder="Search"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchStringValue(e.target.value)
          }
        />
      </div>
      <div className={cn('search__error')}>
        <img src={errorSign} alt="" />
        <span>This is an error message!</span>
      </div>
    </div>
  );
};

export default Search;
