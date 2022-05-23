import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdaptiveGrid.module.scss';
import ArtistCard from '../ArtistCard/ArtistCard';

const cn = classNames.bind(styles);

const AdaptiveGrid = () => {
  return (
    <section className={cn('grid')}>
      <ul className={cn('grid__container')}>
        <ArtistCard name="Jean-Honore Fragonard" years="1732 - 1806" />
        <ArtistCard name="Jean-Honore Fragonard" years="1732 - 1806" />
        <ArtistCard name="Jean-Honore Fragonard" years="1732 - 1806" />
        <ArtistCard name="Jean-Honore Fragonard" years="1732 - 1806" />
      </ul>
    </section>
  );
};

export default AdaptiveGrid;
