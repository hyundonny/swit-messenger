import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import useUser from 'hooks/useUser';
import styles from 'components/chat-input/styles.module.scss';
import { add } from 'redux/slices/message';
import SendIcon from 'assets/icons/SendIcon';
import CloseIcon from 'assets/icons/CloseIcon';

const cx = classNames.bind(styles);

ChatInput.propTypes = {
  reply: PropTypes.object,
  setReply: PropTypes.func.isRequired,
};

function ChatInput({ reply, setReply }) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { userId, userName, profileImage } = useUser();

  const deleteReply = () => {
    setReply(null);
  };

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const sendNewMessage = () => {
    const newMessage = message.trim();
    if (newMessage.length === 0) return;

    const newMessageObject = {
      userId,
      userName,
      profileImage,
      content: newMessage,
    };

    if (reply) {
      newMessageObject.reply = {
        userName: reply.userName,
        content: reply.content,
      };
    } else {
      newMessageObject.reply = null;
    }

    dispatch(add(newMessageObject));

    setMessage('');
    if (reply) deleteReply();
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendNewMessage();
  };

  const handleKeyDown = e => {
    if (e.isComposing || e.keyCode === 229) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendNewMessage();
    }
  };

  return (
    <section className={cx('chat-input-section')}>
      <div className={cx('chat-input-container')}>
        {reply && (
          <div className={cx('chat-input-reply-container')}>
            <div className={cx('chat-input-reply-content')}>
              <p className={cx('chat-input-reply-title')}>
                Reply to {reply.userName}:
              </p>
              <p>{reply.content}</p>
            </div>

            <div className={cx('chat-input-delete-reply-button-container')}>
              <button type="button" onClick={deleteReply}>
                <CloseIcon />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={cx('chat-input-form')}>
          <textarea
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요."
            className={cx('chat-input-textarea')}
          />
          <div className={cx('chat-input-button-container')}>
            <button
              type="submit"
              className={cx('chat-input-send-button')}
              disabled={message.trim().length === 0}>
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChatInput;
