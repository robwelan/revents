import React, { Component } from 'react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';
// requires version PlacesAutocomplete@^6.1.3
import { Form, Label } from '../../../frameworks/semantic-ui-react/scripts';

const styles = {
  autocompleteContainer: {
    zIndex: 1000,
    borderColor: '#DEDFDF',
  },
};

class PlaceInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scriptLoaded: false,
    };

    this.handleScriptLoaded = this.handleScriptLoaded.bind(this);
  }

  handleScriptLoaded() {
    this.setState({ scriptLoaded: true });
  }

  render() {
    const {
      input,
      meta: {
        error,
        touched,
      },
      onSelect,
      options,
      placeholder,
      width,
    } = this.props;
    const { scriptLoaded } = this.state;

    return (
      <Form.Field
        error={touched && !!error}
        width={width}
      >
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        {scriptLoaded
          && (
            <PlacesAutocomplete
              inputProps={{ ...input, placeholder }}
              options={options}
              onSelect={onSelect}
              styles={styles}
            />
          )
        }
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
  }
}

export default PlaceInput;
