import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import Modal from 'components/modal';

import useUserAction from 'hooks/useUserAction';
import styles from 'pages/login/styles.module.scss';
import MEMBERS from 'constants/members';
import logo from 'assets/images/logo.png';

const cx = classNames.bind(styles);

function LoginPage() {
  const [name, setName] = useState('');

  const changeName = e => {
    setName(e.currentTarget.value.trim());
  };

  const { login } = useUserAction();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToChat = event => {
    event.preventDefault();
    if (!name) {
      setIsModalOpen(true);
      return;
    }
    login({
      userId: MEMBERS[3].userId,
      userName: name,
      profileImage: MEMBERS[3].profileImage,
    });
    navigate('/chat');
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={cx('container')}>
      <img className={cx('logo')} src={logo} alt="logo" />
      <div className={cx('login-box')}>
        <div className={cx('title-box')}>
          <h1 className={cx('title')}>환영합니다.</h1>
          <p className={cx('sub-title')}>
            채팅방에 입장하려면 이름을 입력해주세요.
          </p>
        </div>
        <form onSubmit={goToChat} className={cx('login-form')}>
          <input
            placeholder="이름을 입력해주세요"
            value={name || ''}
            onChange={changeName}
            className={cx('name-input')}
            type="text"
            maxLength={10}
            autoFocus={true}
          />
          <button className={cx('submit-button')} type="submit">
            입장하기
          </button>
        </form>
      </div>
      {isModalOpen && (
        <Modal
          message="이름을 입력해주세요!"
          callback={() => navigate('/')}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default LoginPage;
