import React from 'react';
import { Form } from '../../../frameworks/semantic-ui-react/scripts';

const RadioInput = (props) => {
  const {
    input,
    label,
    type,
    width,
  } = props;

  return (
    <Form.Field>
      <div
        className="ui radio"
      >
        <input
          {...input}
          type={type}
        />
        {' '}
        <label>
          {label}
        </label>
      </div>
    </Form.Field>
  );
};

export default RadioInput;
