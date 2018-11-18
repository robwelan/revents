import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { deleteEvent, events } = this.props;

    return (
      <div>
        {/* <h1>Event List</h1> */}
        {events && events.map((event) => (
          <EventListItem
            event={event}
            deleteEvent={deleteEvent}
            key={event.id}
          />
        ))}
      </div>
    )
  }
};

export default EventList;
