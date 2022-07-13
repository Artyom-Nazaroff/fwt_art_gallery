import React, { FC, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import styles from './MainPage.module.scss';
import '../../App.scss';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Preloader from '../../components/_UI/Preloader/Preloader';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import { AddOrEditArtist } from '../../components/AddAndEditArtist/AddAndEditArtist';
import FilterWindow from '../../components/FilterWindow/FilterWindow';
import TextLink from '../../components/_UI/TextLink/TextLink';
import { getParsedQueryString, setQueryStringParams } from '../../helpers/helpers';
import SearchAndFilterRow from '../../components/SearchAndFilterRow/SearchAndFilterRow';

const cn = classNames.bind(styles);

type MainPageProps = {
  setAddEditArtistOpened: (val: boolean) => void;
  setAddOrEditArtist: (val: AddOrEditArtist) => void;
};

const MainPage: FC<MainPageProps> = ({ setAddEditArtistOpened, setAddOrEditArtist }) => {
  const [isFilterWindowOpened, setIsFilterWindowOpened] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc' | null>(null);
  const [perPage, setPerPage] = useState<number>(6);
  const [page, setPage] = useState<number>(1);
  const { theme } = useContext(ThemeContext);
  const { artists, artistsAmount, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { fetchArtists, fetchStaticArtists, getAllGenres } = useActions();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      getAllGenres();
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('accessToken') && isAuth)
      setQueryStringParams({ searchName, selectedGenres, perPage, page, orderBy });
  }, [searchName, selectedGenres, perPage, page, orderBy]);

  useEffect(() => {
    if (Cookies.get('accessToken') && isAuth) {
      const actualFilter = getParsedQueryString({
        setSearchName,
        setSelectedGenres,
        setPerPage,
        setPage,
        setOrderBy,
      });
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
          page={page}
          perPage={perPage}
          selectedGenres={selectedGenres}
          setSearchName={setSearchName}
          setSelectedGenres={setSelectedGenres}
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
              <SearchAndFilterRow
                searchName={searchName}
                fetchSortedArtists={fetchSortedArtists}
                setSearchName={setSearchName}
                setIsFilterWindowOpened={setIsFilterWindowOpened}
                openAddEditWindow={openAddEditWindow}
              />
              {artists?.length === 0 ? (
                <div className={cn('paintings__noResult', 'container')}>
                  <p className={cn('paintings__noResultTopRow')}>
                    No matches for{' '}
                    <span>
                      {searchName?.length !== 0 ? (
                        searchName
                      ) : (
                        <span style={{ fontFamily: 'InterLight, sans-serif' }}>
                          this filter parameters.
                        </span>
                      )}
                    </span>
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
