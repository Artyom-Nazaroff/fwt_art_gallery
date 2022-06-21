import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';
import crossDT from '../../../assets/dark-theme/_UI/Label/cross-dt.svg';
import crossLT from '../../../assets/light-theme/_UI/Label/cross-lt.svg';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type LabelProps = {
  name: string;
  id: string;
  isRemove: boolean;
  removeGenre?: (id: string) => void;
};

const Label: FC<LabelProps> = ({ name, id, isRemove, removeGenre }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('label', {
        'label--dt': theme === 'dark',
        'label--lt': theme === 'light',
      })}
    >
      <span>{name}</span>
      {isRemove && (
        <button className={cn('label__btn')} type="button" onClick={() => removeGenre?.(id)}>
          <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
        </button>
      )}
    </div>
  );
};

export default Label;
