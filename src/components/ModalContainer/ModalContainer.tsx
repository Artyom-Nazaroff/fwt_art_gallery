import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalContainer.module.scss';
import AuthAndRegistration, {
  AuthOrRegistration,
} from '../AuthAndRegistrationWindow/AuthAndRegistration';
import DeletePopUp from '../DeleteArtistPopUp/DeletePopUp';
import AddAndEditArtist, { AddOrEditArtist } from '../AddAndEditArtistPopUp/AddAndEditArtist';
import AddAndEditPainting from '../AddAndEditPaintingPopUp/AddAndEditPainting';

const cn = classNames.bind(styles);

type ModalProps = {
  authOrRegistration: AuthOrRegistration;
  isAuthOpened: boolean;
  isDeleteOpened: boolean;
  isAddEditOpened: boolean;
  isAddPaintingOpened: boolean;
  addOrEditArtist: AddOrEditArtist;
  setAuthOrRegistration: (val: AuthOrRegistration) => void;
  setAuthOpened: (val: boolean) => void;
  setDeleteOpened: (val: boolean) => void;
  setAddEditOpened: (val: boolean) => void;
  setAddPaintingOpened: (val: boolean) => void;
};

const ModalContainer: FC<ModalProps> = ({
  authOrRegistration,
  setAuthOrRegistration,
  isAuthOpened,
  setAuthOpened,
  isDeleteOpened,
  setDeleteOpened,
  isAddEditOpened,
  addOrEditArtist,
  setAddEditOpened,
  isAddPaintingOpened,
  setAddPaintingOpened,
}) => {
  return (
    <div
      className={cn('modalContainer', {
        'modalContainer--active':
          isAuthOpened || isDeleteOpened || isAddEditOpened || isAddPaintingOpened,
      })}
    >
      {isAuthOpened && (
        <AuthAndRegistration
          variant={authOrRegistration}
          setVariant={setAuthOrRegistration}
          setAuthOpened={setAuthOpened}
        />
      )}
      {isDeleteOpened && <DeletePopUp setDeleteOpened={setDeleteOpened} />}
      {isAddEditOpened && (
        <AddAndEditArtist setAddEditOpened={setAddEditOpened} addOrEditArtist={addOrEditArtist} />
      )}
      {isAddPaintingOpened && <AddAndEditPainting setAddPaintingOpened={setAddPaintingOpened} />}
    </div>
  );
};

export default ModalContainer;
