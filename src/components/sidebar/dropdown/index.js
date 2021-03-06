import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import DropdownTitle from 'components/sidebar/shared/dropdown/dropdown-title';
import DropdownItem from 'components/sidebar/shared/dropdown/dropdown-item';

import styles from 'components/sidebar/dropdown/styles.module.scss';

let cx = classNames.bind(styles);

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Dropdown({ title, items }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let dropdownListClassName = cx({
    [styles['dropdown-list']]: true,
    [styles.open]: dropdownOpen,
    [styles.closed]: !dropdownOpen,
  });

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const renderedItems = items.map(({ name, icon, unread, active }) => (
    <DropdownItem
      key={name}
      name={name}
      icon={icon}
      unread={unread}
      active={active}
    />
  ));

  return (
    <section className={styles.dropdown}>
      <DropdownTitle toggle={toggleDropdown} open={dropdownOpen} name={title} />
      <ul className={dropdownListClassName}>{renderedItems}</ul>
    </section>
  );
}

export default Dropdown;
