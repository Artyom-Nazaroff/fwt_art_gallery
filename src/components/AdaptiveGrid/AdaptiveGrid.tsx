import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './AdaptiveGrid.module.scss';
import ArtistCard from '../ArtistCard/ArtistCard';

const cn = classNames.bind(styles);

type AdaptiveGridProps = {
  items: any[];
};

const AdaptiveGrid: FC<AdaptiveGridProps> = ({ items }) => {
  return (
    <section className={cn('grid')}>
      <ul className={cn('grid__container')}>
        {items.map((item) => (
          <ArtistCard key={item.name} name={item.name} years={item.years} />
        ))}
      </ul>
    </section>
  );
};

export default AdaptiveGrid;
