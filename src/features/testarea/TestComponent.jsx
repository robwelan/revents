import React, { Component } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { incrementAsync, decrementAsync } from './testActions';
import { Button } from '../../frameworks/semantic-ui-react/scripts';
import { openModal } from '../modals/modalActions';

const mapState = state => ({
  data: state.test.data,
  loading: state.test.loading,
});

const actions = {
  decrementAsync,
  incrementAsync,
  openModal,
};

class TestComponent extends Component {
  // static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33,
  //   },
  //   zoom: 11,
  // };

  constructor(props) {
    super(props);

    this.state = {
      address: '',
      scriptLoaded: false,
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  onChange = address => this.setState({ address });

  render() {
    const {
      data,
      decrementAsync,
      incrementAsync,
      loading,
      openModal,
    } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.REACT_APP_GOOGLE_MAPS_API
          }&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button
          color="green"
          content="+"
          loading={loading}
          onClick={incrementAsync}
        />
        <Button
          color="red"
          content="-"
          loading={loading}
          onClick={decrementAsync}
        />
        <Button
          onClick={() => openModal('TestModal', { data: 43 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />

        {this.state.scriptLoaded && (
          <form onSubmit={this.handleFormSubmit}>
            <PlacesAutocomplete inputProps={inputProps} />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

TestComponent.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

export default connect(
  mapState,
  actions,
)(TestComponent);
