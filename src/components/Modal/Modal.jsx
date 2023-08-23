import { Component } from 'react';
import { Overlay, ModalItem } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalItem>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </ModalItem>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
