import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonTrashBin.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import trashDT from '../../../assets/dark-theme/artist-profile/trash-bin-dt.svg';
import trashLT from '../../../assets/light-theme/artist-profile/trash-bin-lt.svg';

const cn = classNames.bind(styles);

interface ButtonProps {
  onClick: () => void;
}

const ButtonTrashBin: FC<ButtonProps> = ({ onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button className={cn('trashBinBtn')} type="button" onClick={() => onClick()}>
      <img src={theme === 'dark' ? trashDT : trashLT} alt="" />
    </button>
  );
};

export default ButtonTrashBin;
