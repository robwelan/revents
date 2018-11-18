import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  firestoreConnect,
  isEmpty,
  isLoaded,
} from 'react-redux-firebase';
import { Grid } from '../../../frameworks/semantic-ui-react/scripts';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import RecentActivity from '../EventActivity/EventActivity';
import { deleteEvent } from '../eventActions';

const actions = {
  doDeleteEvent: deleteEvent,
};

const mapState = state => ({
  events: state.firestore.ordered.events,
});

class EventDashboard extends Component {
  handleDeleteEvent(eventId) {
    return () => {
      const { doDeleteEvent } = this.props;

      doDeleteEvent(eventId);
    };
  }

  render() {
    const { events } = this.props;

    if (!isLoaded(events) || isEmpty(events)) {
      return (
        <LoadingComponent
          inverted
        />
      );
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

EventDashboard.defaultProps = {
  events: [],
};

EventDashboard.propTypes = {
  doDeleteEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
};

export default connect(mapState, actions)(
  firestoreConnect(
    [{ collection: 'events' }],
  )(EventDashboard),
);
