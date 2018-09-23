import React, { Component } from 'react'
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { deleteEvent, events, onEventOpen } = this.props;

    return (
      <div>
        <h1>Event List</h1>
        {events.map((event) => (
          <EventListItem
            event={event}
            deleteEvent={deleteEvent}
            key={event.id}
            onEventOpen={onEventOpen}
          />
        ))}
      </div>
    )
  }
};

export default EventList;
