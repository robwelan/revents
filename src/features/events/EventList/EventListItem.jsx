import React, { Component } from 'react'
import {
  Button,
  Icon,
  Item,
  List,
  Segment,
} from '../../../frameworks/semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const {
      deleteEvent,
      event,
      onEventOpen,
    } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                circular
                size="tiny"
                src={event.hostPhotoURL}
              />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {event.date}
            {' | '}
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && event.attendees.map((attendee) => (
              <EventListAttendee
                attendee={attendee}
                key={attendee.id}
              />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as="a"
            color="red"
            content="Delete"
            floated="right"
            onClick={deleteEvent(event.id)}
          />
          <Button
            as="a"
            color="teal"
            content="View"
            floated="right"
            onClick={onEventOpen(event)}
          />
        </Segment>
      </Segment.Group>
    )
  }
};

export default EventListItem;
