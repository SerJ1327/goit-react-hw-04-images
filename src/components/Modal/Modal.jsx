import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from './StyledModal';

export const Modal = ({ selectedImage, onCloseModal, isLoading }) => {
  const handleOverlayClick = e => {
    e.currentTarget === e.target && onCloseModal();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      e.code === 'Escape' && onCloseModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <img src={selectedImage.URL} alt={selectedImage.alt}></img>
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  selectedImage: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
