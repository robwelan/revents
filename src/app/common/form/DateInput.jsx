import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Label } from '../../../frameworks/semantic-ui-react/scripts';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({
  input: {
    value,
    onBlur,
    onChange,
    ...restInput
  },
  meta: {
    error,
    touched,
  },
  placeholder,
  width,
  ...rest
}) => {
  // let { input: { value } } = props;
  // const {
  //   input: {
  //     onBlur,
  //     onChange,
  //     ...restInput
  //   },
  //   meta: {
  //     error,
  //     touched,
  //   },
  //   placeholder,
  //   width,
  //   ...rest
  // } = props;
  let dateObject = null;

  if (value) {
    dateObject = moment(value, 'X');
  }

  // if (value) {
  //   value = moment(value, 'X');
  // } else {
  //   value = null;
  // }
  //  console.log('here', value);
  return (
    <Form.Field
      error={touched && !!error}
      width={width}
    >
      <DatePicker
        {...rest}
        onBlur={() => onBlur()}
        onChange={onChange}
        placeholderText={placeholder}
        // different to course
        // selected={value ? moment(value) : null}
        selected={dateObject}
        {...restInput}
      />
      {touched
        && error
        && (
          <Label
            basic
            color="red"
          >
            {error}
          </Label>
        )
      }
    </Form.Field>
  );
};

export default DateInput;
