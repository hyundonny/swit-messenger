import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Modal from 'components/modal';
import SettingsModal from 'components/settings-modal';

import styles from 'components/sidebar/container/styles.module.scss';
import GearIcon from 'assets/icons/GearIcon';

const cx = classNames.bind(styles);

SidebarContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function SidebarContainer({ isOpen, children }) {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const className = cx({
    'sidebar-container': true,
    open: isOpen,
  });

  const toggleModal = () => {
    setSettingsModalOpen(prev => !prev);
  };

  return (
    <>
      <div className={className}>
        <button
          type="button"
          className={cx('sidebar-settings-icon')}
          onClick={toggleModal}>
          <GearIcon />
        </button>
        <div className={cx('sidebar-inner-container')}>{children}</div>
      </div>
      {settingsModalOpen && (
        <Modal>
          <SettingsModal closeModal={toggleModal} />
        </Modal>
      )}
    </>
  );
}

export default SidebarContainer;
