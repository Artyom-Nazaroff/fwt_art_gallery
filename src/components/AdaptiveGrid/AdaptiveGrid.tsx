import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './AdaptiveGrid.module.scss';

const cn = classNames.bind(styles);

type AdaptiveGridProps = {
  children: React.ReactNode;
};

const AdaptiveGrid: FC<AdaptiveGridProps> = ({ children }) => {
  return (
    <section className={cn('grid')}>
      <ul className={cn('grid__container')}>{children}</ul>
    </section>
  );
};

export default AdaptiveGrid;
