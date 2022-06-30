import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import leftArrowDT from '../../../assets/dark-theme/_UI/Pagination/left-arrow-dt.svg';
import rightArrowDT from '../../../assets/dark-theme/_UI/Pagination/right-arrow-dt.svg';
import leftArrowLT from '../../../assets/light-theme/_UI/Pagination/left-arrow-lt.svg';
import rightArrowLT from '../../../assets/light-theme/_UI/Pagination/right-arrow-lt.svg';
import { usePagination, DOTS } from '../../../hooks/usePagination';

const cn = classNames.bind(styles);

type PaginationProps = {
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (val: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}) => {
  const { theme } = useContext(ThemeContext);
  const paginationRange = usePagination(currentPage, totalCount, siblingCount, pageSize);

  if (paginationRange && (currentPage === 0 || paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    if (currentPage < Math.ceil(totalCount / pageSize)) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <div
      className={cn('pagination', {
        'pagination--dt': theme === 'dark',
        'pagination--lt': theme === 'light',
      })}
    >
      <span className={cn('pagination__arrow')} role="presentation" onClick={onPrevious}>
        <img src={theme === 'dark' ? leftArrowDT : leftArrowLT} alt="" />
      </span>
      <div className={cn('pagination__numbers')}>
        {paginationRange?.map((page) => {
          if (page === DOTS) {
            return <span className={cn('pagination__number', 'pagination__dots')}>...</span>;
          }
          return (
            <span
              className={cn('pagination__number', {
                'pagination__number--active': page === currentPage,
              })}
              role="presentation"
              key={page}
              onClick={() => {
                if (typeof page === 'number') onPageChange(page);
              }}
            >
              {page}
            </span>
          );
        })}
      </div>
      <span className={cn('pagination__arrow')} role="presentation" onClick={onNext}>
        <img src={theme === 'dark' ? rightArrowDT : rightArrowLT} alt="" />
      </span>
    </div>
  );
};

export default Pagination;
