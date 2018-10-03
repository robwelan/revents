import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { Form, Segment, Button } from '../../../frameworks/semantic-ui-react/scripts';
import { login } from '../authActions';

const actions = {
  doLogin: login,
};

const LoginForm = ({ handleSubmit, doLogin }) => {
  return (
    <Form
      error
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
      </Segment>
    </Form>
  );
};

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));
