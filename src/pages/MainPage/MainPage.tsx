import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import '../../App.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AdaptiveGrid from '../../components/AdaptiveGrid/AdaptiveGrid';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';

const cn = classNames.bind(styles);

const MainPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  return (
    <div className={cn('wrapper')}>
      {isMenuOpened && <BurgerMenu />}
      <Header />
      <main className={cn('main')}>
        <section className={cn('paintings')}>
          <div className={cn('paintings__container', 'container')}>
            <AdaptiveGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
