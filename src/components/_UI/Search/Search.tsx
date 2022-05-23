import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import errorSign from '../../../assets/common-files/error-sign.svg';
import searchIconDT from '../../../assets/dark-theme/_UI/Search/search-icon.svg';

const cn = classNames.bind(styles);

interface SearchProps {
  id: string;
  name: string;
}

const Search: FC<SearchProps> = () => {
  return (
    <div className={cn('search', 'search--dt')}>
      <div className={cn('search__field')}>
        <label className={cn('search__label')} htmlFor="id">
          <img src={searchIconDT} alt="" />
        </label>
        <input className={cn('search__input')} type="search" id="id" name="name" />
      </div>
      <div className={cn('search__error')}>
        <img src={errorSign} alt="" />
        <span>This is an error message!</span>
      </div>
    </div>
  );
};

export default Search;
