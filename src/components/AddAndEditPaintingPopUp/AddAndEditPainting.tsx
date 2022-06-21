import React, { ChangeEvent, FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddAndEditPainting.module.scss';
import '../../App.scss';
import crossDT from '../../assets/dark-theme/add-and-edit-profile/cross.svg';
import crossLT from '../../assets/light-theme/add-and-edit-profile/cross.svg';
import iconDT from '../../assets/dark-theme/add-and-edit-painting/icon.svg';
import iconLT from '../../assets/light-theme/add-and-edit-painting/icon.svg';
import Input from '../_UI/Input/Input';
import Button from '../_UI/Button/Button';
import { ThemeContext } from '../../context/themeContext';
import ButtonTrashBin from '../_UI/ButtonTrashBin/ButtonTrashBin';
import { useActions } from '../../hooks/useActions';
import { usePicturePreview } from '../../hooks/usePicturePreview';

const cn = classNames.bind(styles);

type AddAndEditPaintingProps = {
  setAddPaintingOpened: (val: boolean) => void;
};

const AddAndEditPainting: FC<AddAndEditPaintingProps> = ({ setAddPaintingOpened }) => {
  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const { theme } = useContext(ThemeContext);
  const { addNewPainting } = useActions();
  const { picture, picturePreview, onImageChange, deletePicturePreview } = usePicturePreview();

  const savePicture = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('yearOfCreation', year);
    formData.append('image', picture as File);
    addNewPainting(formData);
    setAddPaintingOpened(false);
  };

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
            <button
              className={cn('popup__close')}
              type="button"
              onClick={() => setAddPaintingOpened(false)}
            >
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </button>
          </div>
          <form className={cn('popup__form')}>
            <div className={cn('popup__inputs')}>
              <div className={cn('popup__input')}>
                <Input
                  id="name"
                  type="text"
                  label="The name of the picture"
                  name="name"
                  value={name}
                  changeHandler={setName}
                />
              </div>
              <div className={cn('popup__input')}>
                <Input
                  id="year"
                  type="text"
                  label="Year of creation"
                  name="year"
                  value={year}
                  changeHandler={setYear}
                />
              </div>
            </div>
            <div className={cn('popup__browseImage')}>
              <div className={cn('popup__imageField')}>
                {picturePreview ? (
                  <>
                    <img className={cn('popup__picturePreview')} src={picturePreview} alt="" />
                    <span className={cn('popup__previewPictureIcon')}>
                      <ButtonTrashBin onClick={deletePicturePreview} />
                    </span>
                  </>
                ) : (
                  <>
                    <img
                      className={cn('popup__imageFieldIcon')}
                      src={theme === 'dark' ? iconDT : iconLT}
                      alt=""
                    />
                    <div className={cn('popup__mobileLink')}>
                      <input
                        className={cn('popup__pictureInput')}
                        type="file"
                        name="file"
                        id="portrait"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onImageChange(e)}
                      />
                      <label className={cn('popup__pictureLabel')} htmlFor="portrait">
                        BROWSE IMAGE
                      </label>
                    </div>
                    <div className={cn('popup__desktopLink')}>
                      <p className={cn('popup__desktopLinkText')}>Drop your image here, or</p>
                      <label className={cn('popup__pictureLabel')} htmlFor="portrait">
                        BROWSE
                      </label>
                    </div>
                    <p className={cn('popup__imageFieldText')}>
                      Upload only .jpg or .png format less than 3 MB{' '}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className={cn('popup__btn')}>
              <Button text="Save" onClick={() => savePicture()} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditPainting;
