import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, List } from '../../../frameworks/semantic-ui-react/scripts';

class EventListAttendee extends Component {
  render() {
    const {
      attendee,
      attendee: { photoURL },
    } = this.props;

    return (
      <List.Item>
        <Image
          as={Link}
          circular
          size="mini"
          src={photoURL}
          to={`/profile/${attendee.id}`}
        />
      </List.Item>
    )
  }
};

export default EventListAttendee;
