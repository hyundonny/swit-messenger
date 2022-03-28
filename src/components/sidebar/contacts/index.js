import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import ContactsSearchResult from 'components/sidebar/contacts/search-result';
import ContactsSearchInput from 'components/sidebar/contacts/search-input';

import styles from 'components/sidebar/contacts/styles.module.scss';

const cx = classNames.bind(styles);

function Contacts() {
  const [filterTerm, setFilterTerm] = useState('');

  const resetFilter = () => setFilterTerm('');
  useEffect(() => resetFilter, []);
  // reset filter term on unmount

  return (
    <div className={cx('contacts-container')}>
      <ContactsSearchInput
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
      />
      <ContactsSearchResult filterTerm={filterTerm} />
    </div>
  );
}

export default Contacts;
