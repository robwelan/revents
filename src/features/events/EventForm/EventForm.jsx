/* global google */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from 'revalidate';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  Button,
  Grid,
  Header,
  Form,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import TextInput from '../../../app/common/form/TextInput';

const actions = {
  doCancelToggle: cancelToggle,
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
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    /* destructuring does not match this use case very well */
    /* eslint-disable */
    event = state.firestore.ordered.events[0];

    if (state.firestore.ordered.events.length > 0) {
      const { id } = ownProps.match.params;
      event = Object.assign(
        {},
        state.firestore.ordered.events.filter(evt => evt.id === id)[0],
      );
    }
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading,
  };
};

const validate = combineValidators({
  category: isRequired({ message: 'Please provide a category.' }),
  city: isRequired('city'),
  date: isRequired('date'),
  description: composeValidators(
    isRequired({ message: 'Please enter a description.' }),
    hasLengthGreaterThan(4)({
      message: 'The description must be at least five characters.',
    }),
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

  async componentDidMount() {
    const { firestore, match } = this.props;
    const { id } = match.params;

    await firestore.setListener(`events/${id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    const { id } = match.params;

    await firestore.unsetListener(`events/${id}`);
  }

  async onFormSubmit(values) {
    const {
      doCreateEvent,
      doUpdateEvent,
      event,
      history,
      initialValues,
    } = this.props;
    const { venueLatLng } = this.state;

    const newValues = {
      ...values,
      venueLatLng,
    };

    if (initialValues.id) {
      if (Object.keys(newValues.venueLatLng).length === 0) {
        newValues.venueLatLng = event.venueLatLng;
      }
      await doUpdateEvent(newValues);
      history.goBack();
    } else {
      doCreateEvent(newValues);
      history.push('/events');
    }
  }

  handleScriptLoaded() {
    this.setState({ scriptLoaded: true });
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

  render() {
    const {
      event,
      doCancelToggle,
      handleSubmit,
      history,
      invalid,
      loading,
      pristine,
      submitting,
    } = this.props;
    const { cityLatLng, scriptLoaded } = this.state;

    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.REACT_APP_GOOGLE_MAPS_API
          }&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header color="teal" content="Event Details" sub />
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
              <Header color="teal" content="Event Location Details" sub />
              {scriptLoaded && (
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
              )}
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
                loading={loading}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button disabled={loading} onClick={history.goBack} type="button">
                Cancel
              </Button>
              {
                event.id && (
                  <Button
                    color={event.cancelled ? 'green' : 'red'}
                    floated="right"
                    onClick={() => doCancelToggle(!event.cancelled, event.id)}
                    type="button"
                  >
                    {event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                  </Button>
                )
              }
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

EventForm.propTypes = {
  change: PropTypes.func.isRequired,
  doCancelToggle: PropTypes.func.isRequired,
  doCreateEvent: PropTypes.func.isRequired,
  doUpdateEvent: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  initialValues: PropTypes.shape().isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default withFirestore(
  connect(
    mapState,
    actions,
  )(
    reduxForm({
      form: 'eventForm',
      enableReinitialize: true,
      validate,
    })(EventForm),
  ),
);
