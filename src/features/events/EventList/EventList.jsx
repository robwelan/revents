import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      events,
      getNextEvents,
      loading,
      moreEvents,
    } = this.props;

    return (
      <div>
        {events && events.length !== 0
          && (
            <InfiniteScroll
              pageStart={0}
              loadMore={getNextEvents}
              hasMore={!loading && moreEvents}
              initialLoad={false}
            >
              {events && events.map(event => (
                <EventListItem
                  event={event}
                  key={event.id}
                />
              ))}
            </InfiniteScroll>
          )
        }
      </div>
    );
  }
}

EventList.defaultProps = {
  events: [],
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
};

export default EventList;
