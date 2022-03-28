import classNames from 'classnames/bind';

import Dropdown from 'components/sidebar/dropdown';

import { messageItems } from 'components/sidebar/shared/data';
import CHATROOMS from 'constants/chatrooms';
import CHANNELS from 'constants/channels';
import styles from 'components/sidebar/messages/styles.module.scss';

const cx = classNames.bind(styles);

function Messages() {
  return (
    <div className={cx('messages-container')}>
      <Dropdown title={messageItems[0].name} items={CHATROOMS} />
      <Dropdown title={messageItems[1].name} items={CHANNELS} />
    </div>
  );
}

export default Messages;
