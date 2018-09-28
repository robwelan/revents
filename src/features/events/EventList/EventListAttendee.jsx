import React, { Component } from 'react';
import { Image, List } from '../../../frameworks/semantic-ui-react/scripts';

class EventListAttendee extends Component {
  render() {
    const { attendee: { photoURL } } = this.props;

    return (
      <List.Item>
        <Image
          as="a"
          circular
          size="mini"
          src={photoURL}
        />
      </List.Item>
    )
  }
};

export default EventListAttendee;
