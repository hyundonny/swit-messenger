import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import useMessageAction from 'hooks/useMessageAction';
import styles from 'components/message-delete-modal/styles.module.scss';

const cx = classNames.bind(styles);

MessageDeleteModal.propTypes = {
  targetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closeModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

function MessageDeleteModal({ targetId, closeModal, message }) {
  const trimmedMessage =
    message.length > 10 ? message.slice(0, 11) + '...' : message;

  const { remove } = useMessageAction();
  const deleteMessage = () => {
    remove(targetId);
    closeModal();
  };

  return (
    <div className={cx('message-delete-modal')}>
      <h1>메시지 삭제</h1>
      <p className={cx('warning-message')}>
        &lsquo;{trimmedMessage}&rsquo; 메시지를 삭제하시겠습니까?
      </p>
      <div className={cx('buttons')}>
        <button
          type="button"
          className={cx('button', 'alert')}
          onClick={deleteMessage}>
          예
        </button>
        <button className={cx('button')} type="button" onClick={closeModal}>
          아니오
        </button>
      </div>
    </div>
  );
}

export default MessageDeleteModal;
