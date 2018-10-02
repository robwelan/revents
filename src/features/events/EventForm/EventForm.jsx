/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from 'revalidate';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import cuid from 'cuid';
import moment from 'moment';
import {
  Button,
  Grid,
  Header,
  Form,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import { createEvent, updateEvent } from '../eventActions';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import TextInput from '../../../app/common/form/TextInput';

const actions = {
  doCreateEvent: createEvent,
  doUpdateEvent: updateEvent,
};

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = Object.assign({}, state.events.filter(evt => evt.id === eventId)[0]);
  }

  return {
    initialValues: event,
  };
};

const validate = combineValidators({
  category: isRequired({ message: 'Please provide a category.' }),
  city: isRequired('city'),
  date: isRequired('date'),
  description: composeValidators(
    isRequired({ message: 'Please enter a description.' }),
    hasLengthGreaterThan(4)({ message: 'The description must be at least five characters.' }),
  )(),
  title: isRequired({ message: 'The event title is required.' }),
  venue: isRequired('venue'),
});

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //  event: Object.assign({}, event),
      cityLatLng: {},
      scriptLoaded: false,
      venueLatLng: {},
    };

    this.handleCitySelect = this.handleCitySelect.bind(this);
    this.handleScriptLoaded = this.handleScriptLoaded.bind(this);
    this.handleVenueSelect = this.handleVenueSelect.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleScriptLoaded() {
    this.setState({ scriptLoaded: true });
  }

  onFormSubmit(values) {
    const {
      doCreateEvent,
      doUpdateEvent,
      history,
      initialValues,
    } = this.props;
    const { venueLatLng } = this.state;

    const newValues = {
      ...values,
      date: moment(values.date).format(),
      venueLatLng,
    };

    if (initialValues.id) {
      doUpdateEvent(newValues);
      history.goBack();
    } else {
      const newEvent = {
        ...newValues,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob',
      };

      doCreateEvent(newEvent);
      history.push('/events');
    }
  }

  handleCitySelect(selectedCity) {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ cityLatLng: latlng }))
      .then(() => {
        const { change } = this.props;

        change('city', selectedCity);
      });
  }

  handleVenueSelect(selectedVenue) {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ venueLatLng: latlng }))
      .then(() => {
        const { change } = this.props;

        change('venue', selectedVenue);
      });
  }

  // onInputChange(e) {
  //   const { event } = this.state;
  //   const newEvent = event;

  //   newEvent[e.target.name] = e.target.value;

  //   this.setState({
  //     event: newEvent,
  //   });
  // }

  render() {
    const {
      handleSubmit,
      history,
      invalid,
      pristine,
      submitting,
    } = this.props;
    const { cityLatLng, scriptLoaded } = this.state;

    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header
              color="teal"
              content="Event Details"
              sub
            />
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Field
                component={TextInput}
                name="title"
                placeholder="Give your event a name"
                type="text"
              />
              <Field
                component={SelectInput}
                name="category"
                options={category}
                placeholder="What is your event about?"
                type="text"
              />
              <Field
                component={TextArea}
                name="description"
                placeholder="Tell us about your event"
                rows={3}
              />
              <Header
                color="teal"
                content="Event Location Details"
                sub
              />
              {scriptLoaded
                && (
                  <React.Fragment>
                    <Field
                      component={PlaceInput}
                      name="city"
                      onSelect={this.handleCitySelect}
                      options={{ types: ['(cities)'] }}
                      placeholder="Event city"
                      type="text"
                    />
                    <Field
                      component={PlaceInput}
                      name="venue"
                      onSelect={this.handleVenueSelect}
                      options={{
                        location: new google.maps.LatLng(cityLatLng),
                        radius: 1000,
                        types: ['establishment'],
                      }}
                      placeholder="Event venue"
                      type="text"
                    />
                  </React.Fragment>
                )
              }
              <Field
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                name="date"
                placeholder="Date and time of event"
                showTimeSelect
                timeFormat="HH:mm"
                type="text"
              />
              <Button
                disabled={invalid || pristine || submitting}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={history.goBack} type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(
  reduxForm(
    {
      form: 'eventForm',
      enableReinitialize: true,
      validate,
    },
  )(EventForm),
);
