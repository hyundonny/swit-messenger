import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

function Portal({ children }) {
  const portal = document.getElementById('portal');
  return ReactDOM.createPortal(children, portal);
}

export default Portal;
