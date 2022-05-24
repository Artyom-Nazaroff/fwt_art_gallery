import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';
import crossDT from '../../../assets/dark-theme/_UI/Label/cross-dt.svg';
import crossLT from '../../../assets/light-theme/_UI/Label/cross-lt.svg';
import { ThemeContext } from '../../../context/themeContext';

const cn = classNames.bind(styles);

type LabelProps = {
  text: string;
  isRemove: boolean;
};

const Label: FC<LabelProps> = ({ text, isRemove }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn('label', {
        'label--dt': theme === 'dark',
        'label--lt': theme === 'light',
      })}
    >
      <span>{text}</span>
      {isRemove && (
        <button className={cn('label__btn')} type="button">
          <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
        </button>
      )}
    </div>
  );
};

export default Label;
