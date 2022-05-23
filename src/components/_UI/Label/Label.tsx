import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';
import crossDT from '../../../assets/dark-theme/_UI/Label/cross-dt.svg';

const cn = classNames.bind(styles);

interface LabelProps {
  text: string;
}

const Label: FC<LabelProps> = ({ text }) => {
  return (
    <div className={cn('label', 'label--dt')}>
      <span>{text}</span>
      <img src={crossDT} alt="" />
    </div>
  );
};

export default Label;
