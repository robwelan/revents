import React from 'react';
import { Form, Label } from '../../../frameworks/semantic-ui-react';

const TextInput = (props) => {
  const {
    input,
    placeholder,
    meta: {
      error,
      touched,
    },
    type,
    width,
  } = props;

  return (
    <Form.Field
      error={touched && !!error}
      width={width}
    >
      <input
        {...input}
        placeholder={placeholder}
        type={type}
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

export default TextInput;
