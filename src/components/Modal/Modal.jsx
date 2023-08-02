import PropTypes from 'prop-types';
import { Component } from 'react';
import { StyledOverlay, StyledModal } from './StyledModal';

export class Modal extends Component {
  handleKeyDown = e => {
    e.code === 'Escape' && this.props.onCloseModal();
  };

  handleOverlayClick = e => {
    e.currentTarget === e.target && this.props.onCloseModal();
      };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <StyledOverlay onClick={this.handleOverlayClick}>
        <StyledModal>
          <img
            src={this.props.selectedImage.URL}
            alt={this.props.selectedImage.alt}
          ></img>
        </StyledModal>
      </StyledOverlay>
    );
  }
}

Modal.propTypes = {
  selectedImage: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
