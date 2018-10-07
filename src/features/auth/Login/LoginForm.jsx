import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import {
  Button,
  Divider,
  Form,
  Label,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import SocialLogin from '../SocialLogin/SocialLogin';
import { login, socialLogin } from '../authActions';

const actions = {
  doLogin: login,
  doSocialLogin: socialLogin,
};

const LoginForm = (props) => {
  const {
    handleSubmit,
    doLogin,
    doSocialLogin,
    error,
  } = props;

  return (
    <Form
      onSubmit={handleSubmit(doLogin)}
      size="large"
    >
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />

        <Button fluid size="large" color="teal">
          Login
        </Button>

        {error
          && (
            <React.Fragment>
              <br />
              <Label
                basic
                fluid
                color="red"
                style={{ width: '100%' }}
              >
                {error}
              </Label>
            </React.Fragment>
          )
        }
        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={doSocialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));
