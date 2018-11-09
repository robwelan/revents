import React from 'react';
import { Link } from 'react-router-dom';

import {
  Image,
  Dropdown,
  Menu,
} from '../../../frameworks/semantic-ui-react/scripts';

const SignedInMenu = (props) => {
  const { auth, profile, signOut } = props;

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={profile.photoURL || '/assets/user.png'}
      />
      <Dropdown
        pointing="top left"
        text={profile.displayName}
      >
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item
            as={Link}
            icon="user"
            text="My Profile"
            to={`/profile/${auth.uid}`}
          />
          <Dropdown.Item
            as={Link}
            icon="settings"
            text="Settings"
            to="/settings"
          />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
