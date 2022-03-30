import { useState } from 'react';

import Switch from 'components/sidebar/switch';
import Messages from 'components/sidebar/messages';
import Contacts from 'components/sidebar/contacts';

import { messageItems } from 'components/sidebar/shared/data';

function SidebarContents() {
  const [activeSwitch, setActiveSwitch] = useState(messageItems[0].name);
  return (
    <>
      <Switch activeSwitch={activeSwitch} setActiveSwitch={setActiveSwitch} />
      {activeSwitch === messageItems[0].name ? <Messages /> : <Contacts />}
    </>
  );
}

export default SidebarContents;
