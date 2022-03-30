import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Portal from 'components/portal';

import styles from 'components/modal/styles.module.scss';

const cx = classNames.bind(styles);

Modal.propTypes = { children: PropTypes.node.isRequired };

function Modal({ children }) {
  return (
    <Portal>
      <div className={cx('modal')}>{children}</div>
    </Portal>
  );
}

export default Modal;
