import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Item,
  Label,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

const EventDetailedSidebar = (props) => {
  const { attendees } = props;

  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && attendees.length}
        {' '}
        {attendees && attendees.length === 1 ? 'Person' : 'People'}
        {' Going'}
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {attendees
            && attendees.map(attendee => (
              <Item key={attendee.id} style={{ position: 'relative' }}>
                {attendee.host && (
                  <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right"
                  >
                    {'Host'}
                  </Label>
                )}
                <Item.Image size="tiny" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </div>
  );
};

EventDetailedSidebar.defaultProps = {
  attendees: [],
};

EventDetailedSidebar.propTypes = {
  attendees: PropTypes.arrayOf(PropTypes.shape()),
};

export default EventDetailedSidebar;
