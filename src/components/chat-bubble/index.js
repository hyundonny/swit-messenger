import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Modal from 'components/modal';
import MessageDeleteModal from 'components/message-delete-modal';

import useUser from 'hooks/useUser';
import ReplyIcon from 'assets/icons/ReplyIcon';
import DeleteIcon from 'assets/icons/DeleteIcon';
import styles from 'components/chat-bubble/styles.module.scss';

const cx = classNames.bind(styles);

const ChatBubble = forwardRef(function ChatBubble(props, ref) {
  const { chat, setReply } = props;
  const user = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const setReplyMessage = () => {
    setReply(chat);
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const author =
    chat.userId === user.userId ? `${chat.userName}*` : chat.userName;

  const className = cx({
    box: true,
    'my-msg': chat.userId === user.userId,
  });

  return (
    <>
      <li className={className} ref={ref}>
        <img className={cx('profile-image')} src={chat.profileImage} />

        <div>
          <div>
            <span className={cx('msg-author')}>{author}</span>
            <span className={cx('msg-date')}>{chat.date}</span>
          </div>

          <div className={cx('msg')}>
            {chat.reply && (
              <div className={cx('msg-reply-container')}>
                <p>Reply to: {chat.reply.userName}</p>
                <p>
                  {chat.reply.content.length > 30
                    ? chat.reply.content.slice(0, 21) + '...'
                    : chat.reply.content}
                </p>
              </div>
            )}
            <p>{chat.content}</p>
          </div>
        </div>

        <div className={cx('msg-buttons')}>
          <button
            className={cx('msg-button')}
            value={chat.id}
            onClick={setReplyMessage}
            type="button">
            <ReplyIcon />
          </button>

          {chat.userId === user.userId && (
            <button
              className={cx('msg-button')}
              type="button"
              onClick={toggleModal}>
              <DeleteIcon />
            </button>
          )}
        </div>
      </li>

      {isModalOpen && (
        <Modal>
          <MessageDeleteModal
            targetId={chat.id}
            closeModal={toggleModal}
            message={chat.content}
          />
        </Modal>
      )}
    </>
  );
});

ChatBubble.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.number,
    userName: PropTypes.string,
    content: PropTypes.string,
    profileImage: PropTypes.string,
    date: PropTypes.string,
    reply: PropTypes.object,
  }).isRequired,
  setReply: PropTypes.func.isRequired,
};

export default ChatBubble;
