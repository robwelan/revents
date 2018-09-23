import React, { Component } from 'react';
import {
  Button,
  Form,
  Segment,
} from '../../../frameworks/semantic-ui-react';

const emptyEvent = {
  city: '',
  date: '',
  hostedBy: '',
  title: '',
  venue: '',
};

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: emptyEvent,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const { selectedEvent } = this.props;

    if (selectedEvent !== null) {
      this.setState({
        event: selectedEvent,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedEvent } = this.props;

    if (nextProps.selectedEvent !== selectedEvent) {
      this.setState({
        event: nextProps.selectedEvent || emptyEvent,
      });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { createEvent, updateEvent } = this.props;
    const { event } = this.state;

    if (event.id) {
      updateEvent(event);
    } else {
      createEvent(event);
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
    const { handleCancel } = this.props;
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
          <Button onClick={handleCancel} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
