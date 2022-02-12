import { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from 'components/chat/multiline-input/styles.module.scss';

const cx = classNames.bind(styles);

MultilineInput.propTypes = {
  readOnly: PropTypes.string,
  msg: PropTypes.string.isRequired,
  setMsg: PropTypes.func.isRequired,
  enter: PropTypes.func,
};

function MultilineInput({ msg, setMsg, enter, readOnly }) {
  const inputRef = useRef();

  const readOnlyClassName = cx({
    reply: true,
    active: readOnly.length > 0,
  });

  const changeInputKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      enter();
    }
  };

  const changeInputMessage = e => {
    setMsg(e.target.value);
  };

  return (
    <div className={cx('box')}>
      <div className={readOnlyClassName}>{readOnly}</div>
      <textarea
        className={cx('input')}
        ref={inputRef}
        onKeyUp={changeInputKey}
        onChange={changeInputMessage}
        value={msg}
        placeholder="메시지를 입력하세요."
      />
    </div>
  );
}

export default MultilineInput;
