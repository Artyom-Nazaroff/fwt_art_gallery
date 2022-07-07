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
import ButtonEditDelete, {
  EditOrDeleteButton,
} from '../_UI/ButtonEditDeleteProfile/ButtonEditDelete';
import { useActions } from '../../hooks/useActions';
import { usePicturePreview } from '../../hooks/usePicturePreview';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const cn = classNames.bind(styles);

export enum AddOrEditPainting {
  add = 'add',
  edit = 'edit',
}

type AddAndEditPaintingProps = {
  addOrEditPainting: AddOrEditPainting;
  currentPaintingId: string;
  setAddEditPaintingOpened: (val: boolean) => void;
};

const AddAndEditPainting: FC<AddAndEditPaintingProps> = ({
  setAddEditPaintingOpened,
  addOrEditPainting,
  currentPaintingId,
}) => {
  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const { theme } = useContext(ThemeContext);
  const { addNewPainting, editPainting } = useActions();
  const { artistProfile } = useTypedSelector((state) => state.artists);
  const {
    drag,
    picture,
    picturePreview,
    onImageChange,
    deletePicturePreview,
    dragStartHandler,
    dragLeaveHandler,
    onDropHandler,
  } = usePicturePreview();

  const savePicture = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('yearOfCreation', year);
    formData.append('image', picture as File);
    if (addOrEditPainting === AddOrEditPainting.add) addNewPainting(formData, artistProfile._id);
    if (addOrEditPainting === AddOrEditPainting.edit)
      editPainting(formData, artistProfile._id, currentPaintingId);
    setAddEditPaintingOpened(false);
  };

  return (
    <div className={cn('wrapper')}>
      <div
        className={cn('popupBackground')}
        role="presentation"
        onClick={() => setAddEditPaintingOpened(false)}
      >
        <div
          className={cn('popup', {
            'popup--dt': theme === 'dark',
            'popup--lt': theme === 'light',
          })}
          role="presentation"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <div className={cn('popup__top')}>
            <button
              className={cn('popup__close')}
              type="button"
              onClick={() => setAddEditPaintingOpened(false)}
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
              <div
                className={cn('popup__imageField', { 'popup__imageField--active': drag })}
                onDragEnter={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
                onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
              >
                {picturePreview ? (
                  <>
                    <img className={cn('popup__picturePreview')} src={picturePreview} alt="" />
                    <span className={cn('popup__previewPictureIcon')}>
                      <ButtonEditDelete
                        onClick={deletePicturePreview}
                        variant={EditOrDeleteButton.delete}
                        transparent
                      />
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
