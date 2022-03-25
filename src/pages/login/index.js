import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import useUserAction from 'hooks/useUserAction';
import styles from 'pages/login/styles.module.scss';
import { ME } from 'constants/members';

const cx = classNames.bind(styles);

function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const { login } = useUserAction();
  const navigate = useNavigate();

  const goToChat = e => {
    e.preventDefault();

    if (!name) {
      return setError(prev => !prev);
    }

    login({
      userId: ME.userId,
      userName: name.trim(),
      profileImage: ME.profileImage,
    });

    navigate('/chat');
  };

  const handleChange = e => {
    if (error) {
      setError(prev => !prev);
    }

    setName(e.target.value);
  };

  return (
    <div className={cx('page')}>
      <form className={cx('login-container')} onSubmit={goToChat} noValidate>
        <h1 className={cx('login-title')}>환영합니다!</h1>
        <p className={cx('login-subtitle')}>
          채팅방에서 사용할 이름을 입력해주세요.
        </p>
        <div className={cx('input-container')}>
          <input
            id="login-input"
            type="text"
            value={name}
            onChange={handleChange}
            className={cx({ 'login-input': true, error })}
            required={true}
          />
          <label htmlFor="login-input" className={cx('input-label')}>
            이름
          </label>
        </div>
        <button type="submit" className={cx('login-button')}>
          입장하기
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
