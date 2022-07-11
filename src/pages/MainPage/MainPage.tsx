import React, { FC, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import { createBrowserHistory } from 'history';
import styles from './MainPage.module.scss';
import '../../App.scss';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Preloader from '../../components/_UI/Preloader/Preloader';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import ButtonLink from '../../components/_UI/ButtonLink/ButtonLink';
import { AddOrEditArtist } from '../../components/AddAndEditArtist/AddAndEditArtist';
import Search from '../../components/_UI/Search/Search';
import filterDT from '../../assets/dark-theme/main-page/filter-menu-icon-dt.svg';
import loupeDT from '../../assets/dark-theme/main-page/loupe.svg';
import filterLT from '../../assets/light-theme/main-page/filter-menu-icon-lt.svg';
import loupeLT from '../../assets/light-theme/main-page/loupe.svg';
import FilterWindow from '../../components/FilterWindow/FilterWindow';
import TextLink from '../../components/_UI/TextLink/TextLink';
import { useQueryString } from '../../hooks/useQueryString';
import { QueryType } from '../../types/types';

const cn = classNames.bind(styles);

type MainPageProps = {
  setAddEditArtistOpened: (val: boolean) => void;
  setAddOrEditArtist: (val: AddOrEditArtist) => void;
};

const MainPage: FC<MainPageProps> = ({ setAddEditArtistOpened, setAddOrEditArtist }) => {
  const [isLoupeVisible, setIsLoupeVisible] = useState<boolean>(true);
  const [isFilterWindowOpened, setIsFilterWindowOpened] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc' | null>(null);
  const [perPage, setPerPage] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const { theme } = useContext(ThemeContext);
  const { artists, artistsAmount, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { fetchArtists, fetchStaticArtists, setAuthUser, getAllGenres } = useActions();

  // useQueryString({
  //   searchName,
  //   selectedGenres,
  //   perPage,
  //   page,
  //   orderBy,
  //   setSearchName,
  //   setSelectedGenres,
  //   setPerPage,
  //   setPage,
  //   setOrderBy,
  // });

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setAuthUser();
      getAllGenres();
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('accessToken') && isAuth) {
      const parsed = queryString.parse(createBrowserHistory().location.search) as QueryType;
      const actualFilter: QueryType = {};
      if (parsed.name) {
        actualFilter.name = parsed.name;
        setSearchName(actualFilter.name);
      }
      if (parsed.genres && parsed.genres?.length !== 0) {
        actualFilter.genres = parsed.genres;
        setSelectedGenres([...parsed.genres]);
      }
      if (parsed.perPage) {
        actualFilter.perPage = parsed.perPage;
        setPerPage(parsed.perPage);
      }
      if (parsed.pageNumber) {
        actualFilter.pageNumber = parsed.pageNumber;
        setPage(parsed.pageNumber);
      }
      if (parsed.orderBy) {
        actualFilter.orderBy = parsed.orderBy;
        setOrderBy(parsed.orderBy);
      }
      fetchArtists(
        actualFilter.perPage || perPage,
        actualFilter.pageNumber || page,
        actualFilter.name || searchName,
        actualFilter.genres || selectedGenres,
        actualFilter.orderBy || orderBy
      );
    }
    if (!Cookies.get('accessToken') && !isAuth) fetchStaticArtists();
  }, [isAuth, page]);

  // useEffect(() => {
  //   const query = {} as QueryType;
  //   if (searchName) query.name = searchName;
  //   if (selectedGenres.length !== 0) query.genres = selectedGenres;
  //   if (perPage) query.perPage = perPage;
  //   if (page) query.pageNumber = page;
  //   if (orderBy) query.orderBy = orderBy;
  //   createBrowserHistory().push({
  //     pathname: '/new_art_gallery',
  //     search: queryString.stringify(query),
  //   });
  // }, [searchName, selectedGenres, perPage, page, orderBy]);

  const openAddEditWindow = () => {
    setAddEditArtistOpened(true);
    setAddOrEditArtist(AddOrEditArtist.add);
  };

  const fetchSortedArtists = () => {
    fetchArtists(perPage, page, searchName, selectedGenres, orderBy);
  };

  const addGenreToList = (id: string) => {
    setSelectedGenres((prev) => [...prev, id]);
  };

  const removeGenreFromList = (id: string) => {
    setSelectedGenres((prev) => prev.filter((i) => i !== id));
  };

  return (
    <>
      {isAuth && isFilterWindowOpened && (
        <FilterWindow
          selectedGenres={selectedGenres}
          setOrderBy={setOrderBy}
          setIsFilterWindowOpened={setIsFilterWindowOpened}
          addGenreToList={addGenreToList}
          removeGenreFromList={removeGenreFromList}
          fetchSortedArtists={fetchSortedArtists}
        />
      )}
      <div
        className={cn('wrapper', {
          'wrapper--dt': theme === 'dark',
          'wrapper--lt': theme === 'light',
        })}
      >
        {loading ? (
          <Preloader />
        ) : (
          <main className={cn('main')}>
            <section
              className={cn('paintings', {
                'paintings--dt': theme === 'dark',
                'paintings--lt': theme === 'light',
              })}
            >
              <div
                className={cn('paintings__row', 'container', { 'paintings__row--active': isAuth })}
              >
                <div className={cn('paintings__inner')}>
                  <ButtonLink text="ADD ARTIST" onClick={() => openAddEditWindow()} />
                </div>
                {document.documentElement.clientWidth < 768 && isLoupeVisible ? (
                  <button
                    className={cn('paintings__loupe')}
                    type="button"
                    onClick={() => setIsLoupeVisible(false)}
                  >
                    <img src={theme === 'dark' ? loupeDT : loupeLT} alt="" />
                  </button>
                ) : (
                  <div className={cn('paintings__searchMobile')}>
                    <Search
                      id="search"
                      value={searchName}
                      setSearchStringValue={setSearchName}
                      fetchSortedArtists={fetchSortedArtists}
                    />
                  </div>
                )}
                <div className={cn('paintings__filterFields')}>
                  <div className={cn('paintings__searchDesktop')}>
                    <Search
                      id="search"
                      value={searchName}
                      setSearchStringValue={setSearchName}
                      fetchSortedArtists={fetchSortedArtists}
                    />
                  </div>
                  <button
                    className={cn('paintings__filterMenu')}
                    type="button"
                    onClick={() => setIsFilterWindowOpened(true)}
                  >
                    <img src={theme === 'dark' ? filterDT : filterLT} alt="" />
                  </button>
                </div>
              </div>
              {artists?.length === 0 && searchName?.length !== 0 ? (
                <div className={cn('paintings__noResult', 'container')}>
                  <p className={cn('paintings__noResultTopRow')}>
                    No matches for <span>{searchName}</span>
                  </p>
                  <p className={cn('paintings__noResultBottomRow')}>
                    Please try again with a different spelling or keywords.
                  </p>
                </div>
              ) : (
                <>
                  <div className={cn('paintings__container', 'container')}>
                    <AdaptiveGrid>
                      {artists?.map((i) => (
                        <ArtistCard
                          key={i._id}
                          id={i._id}
                          name={i.name}
                          years={i.yearsOfLife}
                          picture={i.mainPainting && i.mainPainting.image}
                        />
                      ))}
                    </AdaptiveGrid>
                  </div>
                  <div className={cn('paintings__loadMoreBtn')}>
                    {isAuth && page * perPage < artistsAmount && (
                      <span role="presentation" onClick={() => setPage((prev) => +prev + 1)}>
                        <TextLink text="Load more" />
                      </span>
                    )}
                  </div>
                </>
              )}
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default MainPage;
