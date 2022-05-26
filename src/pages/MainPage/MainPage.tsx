import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import '../../App.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import { ThemeContext } from '../../context/themeContext';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Preloader from '../../components/_UI/Preloader/Preloader';

const cn = classNames.bind(styles);

const MainPage = () => {
  const { theme } = useContext(ThemeContext);
  const { artists } = useTypedSelector((state) => state.artists);

  return (
    <div
      className={cn('wrapper', {
        'wrapper--dt': theme === 'dark',
        'wrapper--lt': theme === 'light',
      })}
    >
      <Header />
      <main className={cn('main')}>
        <section className={cn('paintings')}>
          <div className={cn('paintings__container', 'container')}>
            <AdaptiveGrid items={artists} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
