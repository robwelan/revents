import React, { Component } from 'react'
import {
  Button,
  Icon,
  Item,
  List,
  Segment,
} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const { event: {
      attendees,
      date,
      description,
      hostedBy,
      hostPhotoURL,
      title,
      venue,
    },
    } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                circular
                size="tiny"
                src={hostPhotoURL}
              />
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {date}
            {' | '}
            <Icon name="marker" /> {venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees && attendees.map((attendee) => (
              <EventListAttendee
                attendee={attendee}
                key={attendee.id}
              />
            ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{description}</span>
          <Button as="a" color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    )
  }
};

export default EventListItem;
