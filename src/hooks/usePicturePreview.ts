import React, { useState } from 'react';

export const usePicturePreview = () => {
  const [picture, setPicture] = useState<File>();
  const [picturePreview, setPicturePreview] = useState('');

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicturePreview(URL.createObjectURL(e.target.files[0]));
      setPicture(e.target.files[0]);
    }
  };

  const onDragAndDropImageChange = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPicturePreview(URL.createObjectURL(e.dataTransfer.files[0]));
      setPicture(e.dataTransfer.files[0]);
    }
  };

  const deletePicturePreview = () => {
    setPicturePreview('');
  };

  return {
    picture,
    picturePreview,
    onImageChange,
    onDragAndDropImageChange,
    deletePicturePreview,
  };
};
