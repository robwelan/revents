import React from 'react';
import {
  Button,
  Menu,
} from '../../../frameworks/semantic-ui-react';

const SignedOutMenu = (props) => {
  const { signIn } = props;

  return (
    <Menu.Item position="right">
      <Button
        basic
        content="Login"
        inverted
        onClick={signIn}
      />
      <Button
        basic
        content="Register"
        inverted
        style={{ marginLeft: '0.5em' }}
      />
    </Menu.Item>
  )
};

export default SignedOutMenu;
