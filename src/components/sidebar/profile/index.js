import classNames from 'classnames/bind';

import ProfileImage from 'components/sidebar/profile/image';

import useUser from 'hooks/useUser';

import styles from 'components/sidebar/profile/styles.module.scss';

let cx = classNames.bind(styles);

function Profile() {
  const { userName, userId } = useUser();

  return (
    <div className={cx('sidebar-profile')}>
      <ProfileImage />
      <div className={styles['user-info']}>
        <p className={styles['user-name']}>{userName}</p>
        <p className={styles['user-name']}># {userId}</p>
      </div>
    </div>
  );
}

export default Profile;
