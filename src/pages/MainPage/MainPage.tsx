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
  const { theme } = useContext(ThemeContext);
  const { artists, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { fetchArtists, fetchFilteredArtists, setAuthUser, getAllGenres } = useActions();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setAuthUser();
      getAllGenres();
    }
  }, []);

  useEffect(() => {
    if (isAuth) fetchArtists('');
    if (!isAuth) fetchArtists('static');
  }, [isAuth]);

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
      {isFilterWindowOpened && (
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
              <div className={cn('paintings__row', 'container')}>
                <div
                  className={cn('paintings__inner', {
                    'paintings__inner--active': isAuth,
                  })}
                >
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
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default MainPage;
