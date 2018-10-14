import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DateInput from '../../../app/common/form/DateInput';
import RadioInput from '../../../app/common/form/RadioInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';
import {
  Segment,
  Form,
  Header,
  Divider,
  Button,
} from '../../../frameworks/semantic-ui-react/scripts';

class BasicPage extends Component {

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      updateProfile,
    } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form
          onSubmit={handleSubmit(updateProfile)}
        >
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            width={8}
            name="dateOfBirth"
            component={DateInput}
            placeholder="Date of Birth"
            dateFormat="YYYY-MM-DD"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            maxDate={moment().subtract(18, 'years')}
            type="text"
          />
          <Field
            name="city"
            placeholder="Home Town"
            options={{ types: ['(cities)'] }}
            label='Female'
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button disabled={pristine || submitting} size="large" positive content="Update Profile" />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm(
  {
    destroyOnUnmount: false,
    enableReinitialize: true,
    form: 'userProfile',
  },
)(BasicPage);
