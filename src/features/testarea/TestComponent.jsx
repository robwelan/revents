import React, { Component } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import { incrementCounter, decrementCounter } from './testActions';
import { Button, Icon } from '../../frameworks/semantic-ui-react/scripts';

const mapState = state => ({
  data: state.test.data,
});

const actions = {
  incrementCounter,
  decrementCounter,
}

const Marker = () => <Icon color="red" name="marker" size="big" />;

class TestComponent extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptLoaded: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  }

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
    const { data, decrementCounter, incrementCounter } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <h1>
          Test Component
        </h1>
        <h3>
          The answer is:
          {' '}
          {data}
        </h3>
        <Button
          onClick={incrementCounter}
          color="green"
          content="+"
        />
        <Button
          onClick={decrementCounter}
          color="red"
          content="-"
        />
        <br />
        <br />

        {this.state.scriptLoaded
          && (
            <form onSubmit={this.handleFormSubmit}>
              <PlacesAutocomplete inputProps={inputProps} />
              <button type="submit">Submit</button>
            </form>
          )
        }

        <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  };
}

export default connect(mapState, actions)(TestComponent);
