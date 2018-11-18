import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
  Button,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import EventListAttendee from './EventListAttendee';
import { objectToArray } from '../../../app/common/util/helpers';

class EventListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      event,
    } = this.props;
    const eventDate = event.date.toDate();
    const formattedDate = format(eventDate, 'dddd Do MMMM');
    const formattedTime = format(eventDate, 'HH:mm');

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
                <Item.Header
                  as={Link}
                  to={`/event/${event.id}`}
                >
                  {event.title}
                </Item.Header>
                <Item.Description>
                  {'Hosted by '}
                  <Link
                    to={`/profile/${event.hostUid}`}
                  >
                    {event.hostedBy}
                  </Link>
                </Item.Description>
                {
                  event.cancelled
                  && (
                    <Label
                      color="red"
                      content="This event has been Cancelled"
                      ribbon="right"
                      style={{ top: '-40px' }}
                    />
                  )
                }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {` ${formattedDate} at ${formattedTime} | `}
            <Icon name="marker" />
            {' '}
            {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees
              && (
                objectToArray(event.attendees).map(attendee => (
                  <EventListAttendee
                    attendee={attendee}
                    /* eslint-disable */
                    key={attendee.id}
                  />
                ))
              )}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as={Link}
            color="teal"
            content="View"
            floated="right"
            to={`/event/${event.id}`}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

EventListItem.defaultProps = {
  event: {},
};

EventListItem.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  event: PropTypes.shape(),
};

export default EventListItem;
