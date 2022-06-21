import React, { FC, useContext, useEffect } from 'react';
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
import { AddOrEditArtist } from '../../components/AddAndEditArtistPopUp/AddAndEditArtist';

const cn = classNames.bind(styles);

type MainPageProps = {
  setAddEditOpened: (val: boolean) => void;
  setAddOrEditArtist: (val: AddOrEditArtist) => void;
};

const MainPage: FC<MainPageProps> = ({ setAddEditOpened, setAddOrEditArtist }) => {
  const { theme } = useContext(ThemeContext);
  const { artists, loading } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { fetchArtists, setAuthUser } = useActions();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setAuthUser();
    }
  }, []);

  useEffect(() => {
    if (isAuth) fetchArtists('');
    if (!isAuth) fetchArtists('static');
  }, [isAuth]);

  const openAddEditWindow = () => {
    setAddEditOpened(true);
    // document.body.style.overflow = 'hidden';
  };

  return (
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
          <section className={cn('paintings')}>
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
            </div>
            <div className={cn('paintings__container', 'container')}>
              <AdaptiveGrid>
                {artists.map((i) => (
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
  );
};

export default MainPage;
