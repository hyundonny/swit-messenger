import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from 'components/settings-modal/styles.module.scss';
import useUser from 'hooks/useUser';
import useUserAction from 'hooks/useUserAction';

const cx = classNames.bind(styles);

SettingsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

function SettingsModal({ closeModal }) {
  const { userName } = useUser();
  const navigate = useNavigate();
  const { editUserName, logout } = useUserAction();
  const [newUsername, setNewUsername] = useState(userName);

  useEffect(() => () => setNewUsername(userName), []);

  const handleChange = e => {
    setNewUsername(e.target.value);
  };

  const handleLogout = () => {
    navigate(`/`);
    logout();
  };

  const handleNewUsername = e => {
    e.preventDefault();
    const trimmedNewUsername = newUsername.trim();
    if (trimmedNewUsername === userName) return;
    if (trimmedNewUsername.length === 0) return;

    editUserName(trimmedNewUsername);
    closeModal();
  };

  return (
    <div className={cx('settings-modal')}>
      <h1>설정</h1>
      <form onSubmit={handleNewUsername}>
        <div className={cx('username-input-container')}>
          <label className={cx('username-input-label')}>이름 변경</label>
          <input
            type="text"
            className={cx('username-input')}
            value={newUsername}
            onChange={handleChange}
            maxLength={10}
          />
        </div>
        <div className={cx('settings-buttons')}>
          <button
            type="submit"
            className={cx('settings-button', 'save', 'button')}>
            저장
          </button>
          <button
            type="button"
            onClick={closeModal}
            className={cx('settings-button', 'cancel', 'button')}>
            취소
          </button>
        </div>
      </form>
      <button
        type="button"
        className={cx('button', 'settings-logout-button')}
        onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default SettingsModal;
