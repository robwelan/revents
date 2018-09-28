import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from 'revalidate';
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

    // const { event } = this.props;

    // this.state = {
    //   event: Object.assign({}, event),
    // };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(values) {
    const {
      doCreateEvent,
      doUpdateEvent,
      history,
      initialValues,
    } = this.props;

    const newValues = {
      ...values,
      date: moment(values.date).format(),
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

    return (
      <Grid>
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
              <Field
                component={TextInput}
                name="city"
                placeholder="Event city"
                type="text"
              />
              <Field
                component={TextInput}
                name="venue"
                placeholder="Event venue"
                type="text"
              />
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


{/* <Form.Field>
  <label htmlFor="title">
    <input
      name="title"
      onChange={this.onInputChange}
      placeholder="Event Title"
      value={title}
    />
    Event Title
            </label>
</Form.Field>
  <Form.Field>
    <label htmlFor="date">
      <input
        name="date"
        onChange={this.onInputChange}
        type="date"
        value={date}
        placeholder="Event Date"
      />
      Event Date
            </label>
  </Form.Field>
  <Form.Field>
    <label htmlFor="city">
      <input
        name="city"
        onChange={this.onInputChange}
        value={city}
        placeholder="City event is taking place"
      />
      City
            </label>
  </Form.Field>
  <Form.Field>
    <label htmlFor="venue">
      <input
        name="venue"
        onChange={this.onInputChange}
        value={venue}
        placeholder="Enter the Venue of the event"
      />
      Venue
            </label>
  </Form.Field>
  <Form.Field>
    <label htmlFor="hostedBy">
      <input
        name="hostedBy"
        onChange={this.onInputChange}
        value={hostedBy}
        placeholder="Enter the name of person hosting"
      />
      Hosted By
            </label>
  </Form.Field> */}
