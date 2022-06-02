import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './AdaptiveGrid.module.scss';
import ArtistCard from '../ArtistCard/ArtistCard';
import { ArtistItemType } from '../../store/artists/artistsTypes';

const cn = classNames.bind(styles);

type AdaptiveGridProps = {
  items: Array<ArtistItemType>;
};

const AdaptiveGrid: FC<AdaptiveGridProps> = ({ items }) => {
  return (
    <section className={cn('grid')}>
      <ul className={cn('grid__container')}>
        {items.map((item) => (
          <ArtistCard
            key={item.name}
            name={item.name}
            years={item.yearsOfLife}
            picture={item.mainPainting.image.src}
          />
        ))}
      </ul>
    </section>
  );
};

export default AdaptiveGrid;
