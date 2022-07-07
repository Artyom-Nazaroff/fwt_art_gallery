import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddAndEditArtist.module.scss';
import '../../App.scss';
import crossDT from '../../assets/dark-theme/add-and-edit-profile/cross.svg';
import crossLT from '../../assets/light-theme/add-and-edit-profile/cross.svg';
import manIconDT from '../../assets/dark-theme/add-and-edit-profile/man-icon.svg';
import manIconLT from '../../assets/light-theme/add-and-edit-profile/man-icon.svg';
import Input from '../_UI/Input/Input';
import Textarea from '../_UI/Textarea/Textarea';
import Button from '../_UI/Button/Button';
import Multiselect from '../_UI/Multiselect/Multiselect';
import { ThemeContext } from '../../context/themeContext';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ButtonEditDelete, {
  EditOrDeleteButton,
} from '../_UI/ButtonEditDeleteProfile/ButtonEditDelete';
import { Genre } from '../../store/artists/artistsTypes';
import { usePicturePreview } from '../../hooks/usePicturePreview';

const cn = classNames.bind(styles);

export enum AddOrEditArtist {
  add = 'add',
  edit = 'edit',
}

type AddAndEditArtistProps = {
  addOrEditArtist: AddOrEditArtist;
  setAddEditArtistOpened: (val: boolean) => void;
};

const AddAndEditArtist: FC<AddAndEditArtistProps> = ({
  setAddEditArtistOpened,
  addOrEditArtist,
}) => {
  const [name, setName] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [artistsGenres, setArtistsGenres] = useState<Array<Genre>>([]);
  const { theme } = useContext(ThemeContext);
  const { getAllGenres, createArtist, editArtist } = useActions();
  const { genres, artistProfile } = useTypedSelector((state) => state.artists);
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

  useEffect(() => {
    getAllGenres();
  }, []);

  const saveArtist = () => {
    const formData = new FormData();
    if (addOrEditArtist === AddOrEditArtist.add) {
      formData.append('name', name);
      formData.append('yearsOfLife', years);
      formData.append('description', description);
      artistsGenres.forEach((item) => formData.append('genres', item._id));
      formData.append('avatar', picture as File);
      if (name && artistsGenres.length !== 0) createArtist(formData);
    }
    if (addOrEditArtist === AddOrEditArtist.edit) {
      if (name !== '') formData.append('name', name);
      if (years !== '') formData.append('yearsOfLife', years);
      if (description !== '') formData.append('description', description);
      if (artistsGenres.length !== 0)
        artistsGenres.forEach((item) => formData.append('genres', item._id));
      if (picture) formData.append('avatar', picture as File);
      editArtist(formData, artistProfile._id);
    }
    setAddEditArtistOpened(false);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('popupBackground')}>
        <div
          className={cn('popup', {
            'popup--dt': theme === 'dark',
            'popup--lt': theme === 'light',
          })}
          onDragEnter={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
        >
          <div
            className={cn('popup__dragAndDrop', { 'popup__dragAndDrop--active': drag })}
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
          >
            <img src={theme === 'dark' ? manIconDT : manIconLT} alt="" />
            <span className={cn('popup__dragAndDropText')}>Drop your image here</span>
            <span className={cn('popup__dragAndDropLimitation')}>
              Upload only .jpg or .png format less than 3 MB
            </span>
          </div>
          <div className={cn('popup__top')}>
            <button
              className={cn('popup__close')}
              type="button"
              onClick={() => setAddEditArtistOpened(false)}
            >
              <img src={theme === 'dark' ? crossDT : crossLT} alt="" />
            </button>
          </div>
          <form className={cn('popup__content')}>
            <div className={cn('popup__addPortrait')}>
              <div className={cn('popup__portraitField')}>
                {picturePreview ? (
                  <div className={cn('popup__previewPictureInner')}>
                    <img className={cn('popup__previewPicture')} src={picturePreview} alt="" />
                    <span className={cn('popup__previewPictureIcon')}>
                      <ButtonEditDelete
                        onClick={deletePicturePreview}
                        variant={EditOrDeleteButton.delete}
                        transparent
                      />
                    </span>
                  </div>
                ) : (
                  <>
                    <img src={theme === 'dark' ? manIconDT : manIconLT} alt="" />
                    <div className={cn('popup__portraitFieldText')}>
                      You can drop your image here
                    </div>
                  </>
                )}
                <input
                  className={cn('popup__portraitInput')}
                  type="file"
                  name="file"
                  id="portrait"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onImageChange(e)}
                />
              </div>
              <label className={cn('popup__portraitLabel')} htmlFor="portrait">
                Browse Profile Photo
              </label>
            </div>
            <div className={cn('popup__form')}>
              <div className={cn('popup__input')}>
                <Input
                  id="name"
                  type="text"
                  label="Name*"
                  name="name"
                  value={name}
                  changeHandler={setName}
                />
              </div>
              <div className={cn('popup__input')}>
                <Input
                  id="years"
                  type="text"
                  label="Years of life"
                  name="years"
                  value={years}
                  changeHandler={setYears}
                />
              </div>
              <div className={cn('popup__input')}>
                <Input
                  id="location"
                  type="text"
                  label="Location"
                  name="location"
                  value={location}
                  changeHandler={setLocation}
                />
              </div>
              <div className={cn('popup__textarea')}>
                <Textarea
                  id="description"
                  label="Description"
                  name="description"
                  value={description}
                  setValue={setDescription}
                />
              </div>
              <div className={cn('popup__multiselect')}>
                <Multiselect
                  label="Genres*"
                  genresList={genres}
                  artistsGenres={artistsGenres}
                  setArtistsGenres={setArtistsGenres}
                />
              </div>
              <div className={cn('popup__btn')}>
                <Button text="Save" onClick={() => saveArtist()} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditArtist;
