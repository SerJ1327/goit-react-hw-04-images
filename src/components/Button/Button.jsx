import { StyledButton } from './StyledButton';
import PropTypes from 'prop-types';

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
}
