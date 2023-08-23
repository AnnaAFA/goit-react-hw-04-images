import { useEffect } from 'react';
import { Overlay, ModalItem } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, largeImageURL, tags }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <ModalItem>
        <img src={largeImageURL} alt={tags} />
      </ModalItem>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
