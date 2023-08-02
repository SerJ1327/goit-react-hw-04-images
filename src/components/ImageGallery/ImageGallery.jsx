import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './StyledGallery';

export const ImageGallery = ({ images, onSelectedImage }) => {
  return (
    <StyledImageGallery>
      {images.map(image => (
        <ImageGalleryItem image={image} onSelectedImage={onSelectedImage} />
      ))}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onSelectedImage: PropTypes.func,
};
