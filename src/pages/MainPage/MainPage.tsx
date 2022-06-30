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
import ButtonLink from '../../components/_UI/ButtonLink/ButtonLink';
import { AddOrEditArtist } from '../../components/AddAndEditArtist/AddAndEditArtist';
import Search from '../../components/_UI/Search/Search';
import filterDT from '../../assets/dark-theme/main-page/filter-menu-icon-dt.svg';
import loupeDT from '../../assets/dark-theme/main-page/loupe.svg';
import filterLT from '../../assets/light-theme/main-page/filter-menu-icon-lt.svg';
import loupeLT from '../../assets/light-theme/main-page/loupe.svg';
import FilterWindow from '../../components/FilterWindow/FilterWindow';
import TextLink from '../../components/_UI/TextLink/TextLink';

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
  const [perPage, setPerPage] = useState<number>(1);
  const [portionsAmount, setPortionsAmount] = useState<number>(1);
  const { theme } = useContext(ThemeContext);
  const { artists, artistsAmount, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { fetchArtists, fetchStaticArtists, fetchFilteredArtists, setAuthUser, getAllGenres } =
    useActions();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setAuthUser();
      getAllGenres();
    }
  }, []);

  useEffect(() => {
    if (isAuth) fetchArtists(perPage, portionsAmount);
    if (!isAuth) fetchStaticArtists();
  }, [isAuth, portionsAmount]);

  const openAddEditWindow = () => {
    setAddEditArtistOpened(true);
    // document.body.style.overflow = 'hidden';
  };

  const fetchSortedArtists = () => {
    fetchFilteredArtists(searchName, selectedGenres);
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
          setIsFilterWindowOpened={setIsFilterWindowOpened}
          addGenreToList={addGenreToList}
          removeGenreFromList={removeGenreFromList}
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
                  <ButtonLink
                    text="ADD ARTIST"
                    onClick={() => {
                      openAddEditWindow();
                      setAddOrEditArtist(AddOrEditArtist.add);
                    }}
                  />
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
                {isAuth && portionsAmount * perPage < artistsAmount && (
                  <span role="presentation" onClick={() => setPortionsAmount((prev) => prev + 1)}>
                    <TextLink text="Load more" />
                  </span>
                )}
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default MainPage;
