import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { deleteEvent, events } = this.props;

    return (
      <div>
        {events && events.map(event => (
          <EventListItem
            event={event}
            deleteEvent={deleteEvent}
            key={event.id}
          />
        ))}
      </div>
    );
  }
}

EventList.defaultProps = {
  events: [],
};

EventList.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
};

export default EventList;
