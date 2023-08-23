import React from 'react';
import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImagesGallery = ({ images }) => {
  return (
    <>
      <ImageGallery>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        ))}
      </ImageGallery>
    </>
  );
};

ImagesGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
