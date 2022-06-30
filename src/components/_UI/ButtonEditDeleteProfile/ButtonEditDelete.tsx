import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonEditDelete.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import trashDT from '../../../assets/dark-theme/artist-profile/trash-bin-dt.svg';
import editDT from '../../../assets/dark-theme/artist-profile/pen-dt.svg';
import trashLT from '../../../assets/light-theme/artist-profile/trash-bin-lt.svg';
import editLT from '../../../assets/light-theme/artist-profile/pen-lt.svg';

const cn = classNames.bind(styles);

export enum EditOrDeleteButton {
  edit = 'edit',
  delete = 'delete',
}

interface ButtonProps {
  variant: EditOrDeleteButton;
  transparent: boolean;
  onClick: () => void;
}

const ButtonEditDelete: FC<ButtonProps> = ({ onClick, variant, transparent }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={cn('editDeleteBtn', {
        'editDeleteBtn--dt': theme === 'dark',
        'editDeleteBtn--lt': theme === 'light',
        'editDeleteBtn--transparent': transparent,
      })}
      type="button"
      onClick={() => onClick()}
    >
      {variant === EditOrDeleteButton.delete && (
        <img src={theme === 'dark' ? trashDT : trashLT} alt="" />
      )}
      {variant === EditOrDeleteButton.edit && (
        <img src={theme === 'dark' ? editDT : editLT} alt="" />
      )}
    </button>
  );
};

export default ButtonEditDelete;
