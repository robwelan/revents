import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Label } from '../../../frameworks/semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = (props) => {
  const {
    input: {
      onChange,
      value,
      ...restInput
    },
    meta: {
      error,
      touched,
    },
    placeholder,
    width,
    ...rest
  } = props;

  return (
    <Form.Field
      error={touched && !!error}
      width={width}
    >
      <DatePicker
        {...rest}
        onChange={onChange}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
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
