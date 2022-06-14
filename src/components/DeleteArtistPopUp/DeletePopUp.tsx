import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './DeletePopUp.module.scss';
import '../../App.scss';
import Button from '../_UI/Button/Button';
import TextLink from '../_UI/TextLink/TextLink';
import crossDT from '../../assets/dark-theme/delete-popup/close-cross.svg';
import crossLT from '../../assets/light-theme/delete-popup/close-cross.svg';
import trashBinDT from '../../assets/dark-theme/delete-popup/trash-bin.svg';
import trashBinLT from '../../assets/light-theme/delete-popup/trash-bin.svg';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

const DeletePopUp = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn('wrapper', 'popupBackground')}>
      <div
        className={cn('popup', {
          'popup--dt': theme === 'dark',
          'popup--lt': theme === 'light',
        })}
      >
        <div className={cn('popup__top')}>
          <div className={cn('popup__close')}>
            <button className={cn('popup__closeBtn')} type="button">
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </button>
          </div>
          <div className={cn('popup__trashBin')}>
            <img src={theme === 'dark' ? trashBinDT : trashBinLT} alt="" />
          </div>
        </div>
        <h2 className={cn('popup__title')}>Do you want to delete this artist profile?</h2>
        <div className={cn('popup__warning')}>
          You will not be able to recover this profile afterwards.
        </div>
        {/* <div className={cn('popup__btn')}> */}
        {/*  <Button text="Delete" /> */}
        {/* </div> */}
        <div className={cn('popup__link')}>
          <TextLink text="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
