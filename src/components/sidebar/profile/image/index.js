import classNames from 'classnames/bind';
import useUser from 'hooks/useUser';
import styles from 'components/sidebar/profile/image/styles.module.scss';

const cx = classNames.bind(styles);

function ProfileImage() {
  const { profileImage } = useUser();

  return (
    <div className={cx('profile-image-container')}>
      <img src={profileImage} alt="profile" className={cx('profile-image')} />
    </div>
  );
}

export default ProfileImage;
