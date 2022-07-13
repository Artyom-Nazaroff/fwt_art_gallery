import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchAndFilterRow.module.scss';
import '../../App.scss';
import { ThemeContext } from '../../context/themeContext';
import ButtonLink from '../_UI/ButtonLink/ButtonLink';
import loupeDT from '../../assets/dark-theme/main-page/loupe.svg';
import loupeLT from '../../assets/light-theme/main-page/loupe.svg';
import Search from '../_UI/Search/Search';
import filterDT from '../../assets/dark-theme/main-page/filter-menu-icon-dt.svg';
import filterLT from '../../assets/light-theme/main-page/filter-menu-icon-lt.svg';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

type SearchAndFilterProps = {
  searchName: string;
  setSearchName: (val: string) => void;
  openAddEditWindow: () => void;
  fetchSortedArtists: () => void;
  setIsFilterWindowOpened: (val: boolean) => void;
};

const SearchAndFilterRow: FC<SearchAndFilterProps> = ({
  openAddEditWindow,
  searchName,
  setSearchName,
  fetchSortedArtists,
  setIsFilterWindowOpened,
}) => {
  const [isLoupeVisible, setIsLoupeVisible] = useState<boolean>(true);
  const { theme } = useContext(ThemeContext);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);

  return (
    <div
      className={cn('row', 'container', {
        'row--dt': theme === 'dark',
        'row--lt': theme === 'light',
        'row--active': isAuth,
      })}
    >
      <div className={cn('row__inner')}>
        <ButtonLink text="ADD ARTIST" onClick={() => openAddEditWindow()} />
      </div>
      {document.documentElement.clientWidth < 768 && isLoupeVisible ? (
        <button className={cn('row__loupe')} type="button" onClick={() => setIsLoupeVisible(false)}>
          <img src={theme === 'dark' ? loupeDT : loupeLT} alt="" />
        </button>
      ) : (
        <div className={cn('row__searchMobile')}>
          <Search
            id="search"
            value={searchName}
            setSearchStringValue={setSearchName}
            fetchSortedArtists={fetchSortedArtists}
          />
        </div>
      )}
      <div className={cn('row__filterFields')}>
        <div className={cn('row__searchDesktop')}>
          <Search
            id="search"
            value={searchName}
            setSearchStringValue={setSearchName}
            fetchSortedArtists={fetchSortedArtists}
          />
        </div>
        <button
          className={cn('row__filterMenu')}
          type="button"
          onClick={() => setIsFilterWindowOpened(true)}
        >
          <img src={theme === 'dark' ? filterDT : filterLT} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilterRow;
