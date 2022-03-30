import { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import ChatBubble from 'components/chat-bubble';

import useMessage from 'hooks/useMessage';
import styles from 'components/chat-box/styles.module.scss';

const cx = classNames.bind(styles);

ChatBox.propTypes = {
  setReply: PropTypes.func.isRequired,
};

function ChatBox({ setReply }) {
  const messages = useMessage();
  const latest = useRef(null);

  useEffect(() => {
    if (latest.current) {
      latest.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div className={cx('chat-box')}>
      {messages.map((chat, idx) => {
        return idx === messages.length - 1 ? (
          <ChatBubble
            key={chat.id}
            chat={chat}
            setReply={setReply}
            ref={latest}
          />
        ) : (
          <ChatBubble key={chat.id} chat={chat} setReply={setReply} />
        );
      })}
    </div>
  );
}

export default ChatBox;
