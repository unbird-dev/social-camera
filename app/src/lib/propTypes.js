
import PropTypes from 'prop-types';

export const links = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subLinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
}));


export default { links };
