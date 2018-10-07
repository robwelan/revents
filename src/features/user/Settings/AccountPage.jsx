import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  isRequired,
  matchesField,
} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon,
} from '../../../frameworks/semantic-ui-react/scripts';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Please enter a password.' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please confirm your password.' }),
    matchesField('newPassword1')({ message: 'Passwords do not match.' }),
  )(),
});

const AccountPage = (props) => {
  const {
    error,
    handleSubmit,
    invalid,
    providerId,
    submitting,
    updatePassword,
  } = props;

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === 'password'
        && (
          <div>
            <Header color="teal" sub content="Change password" />
            <p>Use this form to update your account settings</p>
            <Form
              onSubmit={handleSubmit(updatePassword)}
            >
              <Field
                width={8}
                name="newPassword1"
                type="password"
                pointing="left"
                inline={true}
                component={TextInput}
                basic={true}
                placeholder="New Password"
              />
              <Field
                width={8}
                name="newPassword2"
                type="password"
                inline={true}
                basic={true}
                pointing="left"
                component={TextInput}
                placeholder="Confirm Password"
              />
              {error && (
                <Label basic color="red">
                  {error}
                </Label>
              )}
              <Divider />
              <Button
                content="Update Password"
                disabled={invalid || submitting}
                positive
                size="large"
              />
            </Form>
          </div>
        )
      }

      {providerId && providerId === 'facebook.com'
        && (
          <div>
            <Header color="teal" sub content="Facebook Account" />
            <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="facebook">
              <Icon name="facebook" />
              Go to Facebook
            </Button>
          </div>
        )
      }

      {providerId && providerId === 'google.com'
        && (
          <div>
            <Header color="teal" sub content="Google Account" />
            <p>Please visit Google to update your account settings</p>
            <Button type="button" color="google plus">
              <Icon name="google plus" />
              Go to Google
            </Button>
          </div>
        )
      }
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);
