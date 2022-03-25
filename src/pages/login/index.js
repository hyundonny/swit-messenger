import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import useUserAction from 'hooks/useUserAction';
import styles from 'pages/login/styles.module.scss';
import { ME } from 'constants/members';
import logo from 'assets/images/logo.png';

const cx = classNames.bind(styles);

function LoginPage() {
  const [name, setName] = useState('');

  const { login } = useUserAction();
  const navigate = useNavigate();

  const goToChat = event => {
    event.preventDefault();

    if (!name) return;

    login({
      userId: ME.userId,
      userName: name,
      profileImage: ME.profileImage,
    });
    navigate('/chat');
  };

  return (
    <div className={cx('page')}>
      <div className={cx('login-container')}>
        <h1 className={cx('login-title')}>환영합니다!</h1>
        <p className={cx('login-subtitle')}>
          채팅방에서 사용할 이름을 입력해주세요.
        </p>
        <div className={cx('input-container')}>
          <input
            id="login-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={cx('login-input')}
            required={true}
          />
          <label htmlFor="login-input" className={cx('input-label')}>
            이름
          </label>
        </div>
        <button type="button" className={cx('login-button')}>
          입장하기
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
