import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdaptiveGrid.module.scss';
import Artist from '../Artist/Artist';

const cn = classNames.bind(styles);

const AdaptiveGrid = () => {
  return (
    <section className={cn('grid')}>
      <ul className={cn('grid__container')}>
        <Artist />
        <Artist />
        <Artist />
        <Artist />
      </ul>
    </section>
  );
};

export default AdaptiveGrid;
