import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './AddAndEditPainting.module.scss';
import '../../App.scss';
import TextLink from '../_UI/TextLink/TextLink';
import crossDT from '../../assets/dark-theme/add-and-edit-profile/cross.svg';
import crossLT from '../../assets/light-theme/add-and-edit-profile/cross.svg';
import iconDT from '../../assets/dark-theme/add-and-edit-painting/icon.svg';
import iconLT from '../../assets/light-theme/add-and-edit-painting/icon.svg';
import Input from '../_UI/Input/Input';
import Button from '../_UI/Button/Button';
import { ThemeContext } from '../../context/themeContext';

const cn = classNames.bind(styles);

const AddAndEditPainting = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('popupBackground')}>
        <div
          className={cn('popup', {
            'popup--dt': theme === 'dark',
            'popup--lt': theme === 'light',
          })}
        >
          <div className={cn('popup__top')}>
            <div className={cn('popup__close')}>
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </div>
          </div>
          <form className={cn('popup__form')}>
            {/* <div className={cn('popup__inputs')}> */}
            {/*  <div className={cn('popup__input')}> */}
            {/*    <Input id="name" type="text" label="The name of the picture" name="name" /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__input')}> */}
            {/*    <Input id="year" type="text" label="Year of creation" name="year" /> */}
            {/*  </div> */}
            {/* </div> */}
            <div className={cn('popup__browseImage')}>
              <div className={cn('popup__imageField')}>
                <img src={theme === 'dark' ? iconDT : iconLT} alt="" />
                <div className={cn('popup__mobileLink')}>
                  <TextLink text="browse image" />
                </div>
                <div className={cn('popup__desktopLink')}>
                  <p className={cn('popup__desktopLinkText')}>Drop your image here, or</p>
                  <TextLink text="browse" />
                </div>
                <p className={cn('popup__imageFieldText')}>
                  Upload only .jpg or .png format less than 3 MB{' '}
                </p>
              </div>
            </div>
            {/* <div className={cn('popup__btn')}> */}
            {/*  <Button text="Save" /> */}
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditPainting;
