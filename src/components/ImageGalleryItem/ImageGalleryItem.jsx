import PropTypes from 'prop-types';
import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './Styled.GalleryItem';

export const ImageGalleryItem = ({ image, onSelectedImage }) => {
  return (
    <StyledImageGalleryItem key={image.id}>
      <StyledImageGalleryItemImg
        key="3"
        onClick={() =>
          onSelectedImage({ URL: image.largeImageURL, alt: image.tags })
        }
        src={image.webformatURL}
        alt={image.tags}
      />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onSelectedImage: PropTypes.func,
};
