import React from 'react';
import {
  Form,
  Label,
  Select,
} from '../../../frameworks/semantic-ui-react';

const SelectInput = (props) => {
  const {
    input,
    meta: {
      error,
      touched,
    },
    multiple,
    options,
    placeholder,
  } = props;

  return (
    <Form.Field
      error={touched && !!error}
    >
      <Select
        multiple={multiple}
        onChange={(e, data) => input.onChange(data.value)}
        options={options}
        placeholder={placeholder}
        value={input.value || null}
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

export default SelectInput;
