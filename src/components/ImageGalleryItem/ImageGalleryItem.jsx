import { Component } from 'react';
import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageItem extends Component {
  state = {
    showModal: false,
    largeImage: '',
  };

  handleImageClick = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { id, webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <ImageGalleryItem key={id}>
          <ImageGalleryItemImage
            src={webformatURL}
            alt={tags}
            onClick={this.handleImageClick}
          />
        </ImageGalleryItem>
        {this.state.showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}

ImageItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
