import React, { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PaintingCard.module.scss';
import arrow from '../../assets/dark-theme/artist-profile/back-arrow-dt.svg';
import { ThemeContext } from '../../context/themeContext';
import gear from '../../assets/common-files/gear.svg';
import { DeleteArtistOrPainting } from '../DeletePopup/DeletePopup';
import { AddOrEditPainting } from '../AddAndEditPainting/AddAndEditPainting';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const cn = classNames.bind(styles);

type PaintingCardProps = {
  id: string;
  index: number;
  name: string;
  year: string;
  picture: string;
  onClick: (id: string, index: number) => void;
  setDeleteOpened?: (val: boolean) => void;
  setAddEditPaintingOpened?: (val: boolean) => void;
  setDeleteArtistOrPainting?: (val: DeleteArtistOrPainting) => void;
  setAddOrEditPainting?: (val: AddOrEditPainting) => void;
  setCurrentPaintingId?: (val: string) => void;
};

const PaintingCard: FC<PaintingCardProps> = ({
  id,
  index,
  name,
  year,
  picture,
  onClick,
  setDeleteOpened,
  setAddEditPaintingOpened,
  setDeleteArtistOrPainting,
  setAddOrEditPainting,
  setCurrentPaintingId,
}) => {
  const { theme } = useContext(ThemeContext);
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const { artistProfile } = useTypedSelector((state) => state.artists);
  const { isAuth } = useTypedSelector((state) => state.authRegistration);
  const { editMainPainting } = useActions();

  const openCloseMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownActive(!isDropdownActive);
  };

  const openEditWindow = () => {
    setAddEditPaintingOpened?.(true);
    setAddOrEditPainting?.(AddOrEditPainting.edit);
    setCurrentPaintingId?.(id);
    setIsDropdownActive(false);
  };

  const openDeleteWindow = () => {
    setDeleteOpened?.(true);
    setDeleteArtistOrPainting?.(DeleteArtistOrPainting.painting);
    setCurrentPaintingId?.(id);
    setIsDropdownActive(false);
  };

  return (
    <li
      className={cn('painting', {
        'painting--dt': theme === 'dark',
        'painting--lt': theme === 'light',
      })}
      onClick={() => onClick(id, index)}
      role="presentation"
    >
      <div
        className={cn('painting__inner')}
        onMouseLeave={() => {
          setIsDropdownActive(false);
        }}
      >
        {isAuth && (
          <button
            className={cn('painting__btn')}
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => openCloseMenu(e)}
          >
            <img src={gear} alt="" />
          </button>
        )}
        <ul
          className={cn('painting__list', { 'painting__list--active': isDropdownActive })}
          role="presentation"
          onClick={(e: React.MouseEvent<HTMLUListElement>) => e.stopPropagation()}
        >
          <li className={cn('painting__item')}>
            <button
              className={cn('painting__itemBtn')}
              type="button"
              onClick={() => {
                editMainPainting(artistProfile._id, id);
                setIsDropdownActive(false);
              }}
            >
              {id === artistProfile?.mainPainting?._id ? 'Remove' : 'Make'} the cover
            </button>
          </li>
          <li className={cn('painting__item')}>
            <button
              className={cn('painting__itemBtn')}
              type="button"
              onClick={() => {
                openEditWindow();
                window.scroll({ left: 0, top: 0, behavior: 'smooth' });
              }}
            >
              Edit
            </button>
          </li>
          <li className={cn('painting__item')}>
            <button
              className={cn('painting__itemBtn')}
              type="button"
              onClick={() => openDeleteWindow()}
            >
              Delete
            </button>
          </li>
        </ul>
        <img src={`https://internship-front.framework.team/${picture}`} alt="painting" />
        <div className={cn('painting__info')}>
          <div className={cn('painting__name')}>{name}</div>
          <div className={cn('painting__dateOfCreation')}>{year}</div>
        </div>
        <div className={cn('painting__arrow')}>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </li>
  );
};

export default PaintingCard;
