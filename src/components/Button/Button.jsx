import PropTypes from 'prop-types';
import { StyledButton } from './StyledButton';

export const Button = ({ onSubmit, query }) => {
  return (
    <StyledButton onClick={() => onSubmit(query)} type="button">
      Load more
    </StyledButton>
  );
};

Button.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
