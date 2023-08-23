import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMoreButton = ({ loadMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={loadMore}>
      Load more
    </LoadMoreBtn>
  );
};

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
