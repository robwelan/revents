import React from 'react';
import { Button, Icon } from '../../../frameworks/semantic-ui-react/scripts';

const SocialLogin = (props) => {
  const { socialLogin } = props;

  return (
    <div>
      <Button
        color="facebook"
        fluid
        onClick={() => socialLogin('facebook')}
        style={{ marginBottom: '10px' }}
        type="button"
      >
        <Icon name="facebook" />
        {' Login with Facebook'}
      </Button>

      <Button
        color="google plus"
        fluid
        onClick={() => socialLogin('google')}
        type="button"
      >
        <Icon name="google plus" />
        {' Login with Google'}
      </Button>
    </div>
  );
};

export default SocialLogin;
