import { useState } from 'react';
import classNames from 'classnames/bind';

import ChatBox from 'components/chat-box';
import ChatInput from 'components/chat-input';

import styles from 'components/chat/styles.module.scss';

const cx = classNames.bind(styles);

function Chat() {
  const [reply, setReply] = useState(null);

  return (
    <section className={cx('main')}>
      <ChatBox setReply={setReply} />
      <ChatInput reply={reply} setReply={setReply} />
    </section>
  );
}

export default Chat;
