import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';
import {
  Button,
  Divider,
  Form,
  Label,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import { registerUser } from '../authActions';

const actions = {
  doRegisterUser: registerUser,
};

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password'),
});

const RegisterForm = (props) => {
  const {
    doRegisterUser,
    error,
    handleSubmit,
    invalid,
    submitting,
  } = props;

  return (
    <div>
      <Form
        onSubmit={handleSubmit(doRegisterUser)}
        size="large"
      >
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button disabled={invalid || submitting} fluid size="large" color="teal">
            Register
          </Button>

          {error
            && (
              <React.Fragment>
                <br />
                <Label
                  basic
                  fluid
                  color="red"
                >
                  {error}
                </Label>
              </React.Fragment>
            )
          }

          <Divider horizontal>Or</Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions,
)(
  reduxForm(
    {
      form: 'registerForm',
      validate,
    },
  )(
    RegisterForm,
  ),
);
