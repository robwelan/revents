import React from 'react';
import { Form, Label } from '../../../frameworks/semantic-ui-react';

const TextArea = (props) => {
  const {
    input,
    meta: {
      error,
      touched,
    },
    placeholder,
    rows,
  } = props;

  return (
    <Form.Field
      error={touched && !!error}
    >
      <textarea
        {...input}
        placeholder={placeholder}
        rows={rows}
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

export default TextArea;
