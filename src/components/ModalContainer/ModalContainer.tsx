import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalContainer.module.scss';
import AuthAndRegistration, {
  AuthOrRegistration,
} from '../AuthAndRegistration/AuthAndRegistration';
import DeletePopup, { DeleteArtistOrPainting } from '../DeletePopup/DeletePopup';
import AddAndEditArtist, { AddOrEditArtist } from '../AddAndEditArtist/AddAndEditArtist';
import AddAndEditPainting, { AddOrEditPainting } from '../AddAndEditPainting/AddAndEditPainting';

const cn = classNames.bind(styles);

type ModalProps = {
  authOrRegistration: AuthOrRegistration;
  isAuthOpened: boolean;
  isDeleteOpened: boolean;
  isAddEditArtistOpened: boolean;
  isAddEditPaintingOpened: boolean;
  currentPaintingId: string;
  addOrEditArtist: AddOrEditArtist;
  addOrEditPainting: AddOrEditPainting;
  deleteArtistOrPainting: DeleteArtistOrPainting;
  setAuthOrRegistration: (val: AuthOrRegistration) => void;
  setAuthOpened: (val: boolean) => void;
  setDeleteOpened: (val: boolean) => void;
  setAddEditArtistOpened: (val: boolean) => void;
  setAddEditPaintingOpened: (val: boolean) => void;
};

const ModalContainer: FC<ModalProps> = ({
  authOrRegistration,
  setAuthOrRegistration,
  isAuthOpened,
  setAuthOpened,
  isDeleteOpened,
  setDeleteOpened,
  isAddEditArtistOpened,
  addOrEditArtist,
  addOrEditPainting,
  setAddEditArtistOpened,
  isAddEditPaintingOpened,
  setAddEditPaintingOpened,
  deleteArtistOrPainting,
  currentPaintingId,
}) => {
  return (
    <div
      className={cn('modalContainer', {
        'modalContainer--active':
          isAuthOpened || isDeleteOpened || isAddEditArtistOpened || isAddEditPaintingOpened,
      })}
    >
      {isAuthOpened && (
        <AuthAndRegistration
          variant={authOrRegistration}
          setVariant={setAuthOrRegistration}
          setAuthOpened={setAuthOpened}
        />
      )}
      {isDeleteOpened && (
        <DeletePopup
          setDeleteOpened={setDeleteOpened}
          deleteArtistOrPainting={deleteArtistOrPainting}
          currentPaintingId={currentPaintingId}
        />
      )}
      {isAddEditArtistOpened && (
        <AddAndEditArtist
          setAddEditArtistOpened={setAddEditArtistOpened}
          addOrEditArtist={addOrEditArtist}
        />
      )}
      {isAddEditPaintingOpened && (
        <AddAndEditPainting
          setAddEditPaintingOpened={setAddEditPaintingOpened}
          addOrEditPainting={addOrEditPainting}
          currentPaintingId={currentPaintingId}
        />
      )}
    </div>
  );
};

export default ModalContainer;
