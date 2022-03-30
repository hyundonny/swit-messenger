import { useState } from 'react';
import classNames from 'classnames/bind';
import { Navigate } from 'react-router-dom';

import Chat from 'components/chat';
import SidebarContainer from 'components/sidebar/container';
import Profile from 'components/sidebar/profile';
import SidebarContents from 'components/sidebar/contents';

import logo from 'assets/images/logo.png';
import styles from 'pages/chat/styles.module.scss';
import useUser from 'hooks/useUser';

const cx = classNames.bind(styles);

function ChatPage() {
  const [sidebarOpen] = useState(false);
  const { isLogin } = useUser();

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SidebarContainer isOpen={sidebarOpen}>
        <Profile />
        <SidebarContents />
      </SidebarContainer>
      <main>
        <div className={cx('top-bar')}>
          <img src={logo} alt="Swit" className={cx('logo')} />
        </div>
        <Chat />
      </main>
    </>
  );
}

export default ChatPage;
