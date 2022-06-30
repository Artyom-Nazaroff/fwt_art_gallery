import React, { useState } from 'react';

export const usePicturePreview = () => {
  const [picture, setPicture] = useState<File>();
  const [picturePreview, setPicturePreview] = useState('');
  const [drag, setDrag] = useState<boolean>(false);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicturePreview(URL.createObjectURL(e.target.files[0]));
      setPicture(e.target.files[0]);
    }
  };

  const deletePicturePreview = () => {
    setPicturePreview('');
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPicturePreview(URL.createObjectURL(e.dataTransfer.files[0]));
      setPicture(e.dataTransfer.files[0]);
    }
    setDrag(false);
  };

  return {
    drag,
    picture,
    picturePreview,
    onImageChange,
    deletePicturePreview,
    dragStartHandler,
    dragLeaveHandler,
    onDropHandler,
  };
};
