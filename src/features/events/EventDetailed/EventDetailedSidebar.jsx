import React from 'react';
import {
  Item,
  Label,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

const EventDetailedSidebar = (props) => {
  const { attendees } = props;
  const isHost = false;

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
        {' '}
        Going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {
            attendees
            && attendees.map(attendee => (
              <Item
                key={attendee.id}
                style={{ position: 'relative' }}
              >
                {isHost
                  && (
                    <Label
                      style={{ position: 'absolute' }}
                      color="orange"
                      ribbon="right"
                    >
                      Host
                    </Label>
                  )
                }
                <Item.Image
                  size="tiny"
                  src={attendee.photoURL}
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <a>{attendee.name}</a>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))
          }
        </Item.Group>
      </Segment>
    </div>
  );
};

export default EventDetailedSidebar;
