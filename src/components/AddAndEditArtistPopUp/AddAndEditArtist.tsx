import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './AddAndEditArtist.module.scss';
import '../../App.scss';
import TextLink from '../_UI/TextLink/TextLink';
import crossDT from '../../assets/dark-theme/add-and-edit-profile/cross.svg';
import crossLT from '../../assets/light-theme/add-and-edit-profile/cross.svg';
import manIconDT from '../../assets/dark-theme/add-and-edit-profile/man-icon.svg';
import manIconLT from '../../assets/light-theme/add-and-edit-profile/man-icon.svg';
import Input from '../_UI/Input/Input';
import Textarea from '../_UI/Textarea/Textarea';
import Button from '../_UI/Button/Button';
import Multiselect from '../_UI/Multiselect/Multiselect';
import { ThemeContext } from '../../context/themeContext';
import Search from '../_UI/Search/Search';

const cn = classNames.bind(styles);

const AddAndEditArtist = () => {
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
          <div className={cn('popup__content')}>
            <div className={cn('popup__addPortrait')}>
              <div className={cn('popup__portraitField')}>
                <img src={theme === 'dark' ? manIconDT : manIconLT} alt="" />
                <div className={cn('popup__portraitFieldText')}>You can drop your image here</div>
              </div>
              <TextLink text="Browse Profile Photo" />
            </div>
            {/* <form className={cn('popup__form')}> */}
            {/*  <div className={cn('popup__input')}> */}
            {/*    <Input id="name" type="text" label="Name*" name="name"  /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__input')}> */}
            {/*    <Input id="years" type="text" label="Years of life" name="years" /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__input')}> */}
            {/*    <Input id="location" type="text" label="Location" name="location" /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__textarea')}> */}
            {/*    <Textarea id="description" label="Description" name="description" /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__multiselect')}> */}
            {/*    <Multiselect /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__multiselect')}> */}
            {/*    <Search id="search" name="search" /> */}
            {/*  </div> */}
            {/*  <div className={cn('popup__btn')}> */}
            {/*    <Button text="Save" /> */}
            {/*  </div> */}
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditArtist;
