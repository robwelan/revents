import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import {
  Button,
  Form,
  Segment,
} from '../../../frameworks/semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';

const actions = {
  doCreateEvent: createEvent,
  doUpdateEvent: updateEvent,
};

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    city: '',
    date: '',
    hostedBy: '',
    title: '',
    venue: '',
  };

  if (eventId && state.events.length > 0) {
    event = Object.assign({}, state.events.filter(evt => evt.id === eventId)[0]);
  }

  return {
    event,
  };
};

class EventForm extends Component {
  constructor(props) {
    super(props);

    const { event } = this.props;

    this.state = {
      event: Object.assign({}, event),
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { doCreateEvent, doUpdateEvent, history } = this.props;
    const { event } = this.state;

    if (event.id) {
      doUpdateEvent(event);
      history.goBack();
    } else {
      const newEvent = {
        ...event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };

      doCreateEvent(newEvent);
      history.push('/events');
    }
  }

  onInputChange(e) {
    const { event } = this.state;
    const newEvent = event;

    newEvent[e.target.name] = e.target.value;

    this.setState({
      event: newEvent,
    });
  }

  render() {
    const { history } = this.props;
    const {
      event: {
        city,
        date,
        hostedBy,
        title,
        venue,
      },
    } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
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
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(EventForm);
