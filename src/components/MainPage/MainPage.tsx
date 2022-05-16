import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.module.scss';
import '../../App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PaintingsContainer from '../AdaptiveGrid/AdaptiveGrid';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

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
            <PaintingsContainer />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
