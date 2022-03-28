import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from 'components/sidebar/container/styles.module.scss';

// desktop: 열고 닫기 기능 없이 항상 visible
// mobile: 열고 닫기 기능 존재, 열렸을 때 화면 전체를 가림

const cx = classNames.bind(styles);

SidebarContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function SidebarContainer({ isOpen, children }) {
  const className = cx({
    'sidebar-container': true,
    open: isOpen,
  });

  return (
    <div className={className}>
      <div className={cx('sidebar-inner-container')}>{children}</div>
    </div>
  );
}

export default SidebarContainer;
