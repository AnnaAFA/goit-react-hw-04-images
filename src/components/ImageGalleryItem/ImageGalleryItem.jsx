import { useState } from 'react';
import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ImageGalleryItem key={id}>
        <ImageGalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={handleImageClick}
        />
      </ImageGalleryItem>
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

ImageItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
