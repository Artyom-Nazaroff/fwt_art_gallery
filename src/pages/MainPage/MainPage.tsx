import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import '../../App.scss';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Preloader from '../../components/_UI/Preloader/Preloader';
import ArtistCard from '../../components/ArtistCard/ArtistCard';

const cn = classNames.bind(styles);

const MainPage = () => {
  const { theme } = useContext(ThemeContext);
  const { artists, loading } = useTypedSelector((state) => state.artists);
  const { fetchArtists } = useActions();

  useEffect(() => {
    fetchArtists();
  }, []);

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
            <div className={cn('paintings__container', 'container')}>
              <AdaptiveGrid>
                {artists.map((i) => (
                  <ArtistCard
                    key={i._id}
                    id={i._id}
                    name={i.name}
                    years={i.yearsOfLife}
                    picture={i.mainPainting.image}
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
