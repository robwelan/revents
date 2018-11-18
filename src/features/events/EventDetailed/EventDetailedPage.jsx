import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from '../../../frameworks/semantic-ui-react/scripts';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectHasKey, objectToArray } from '../../../app/common/util/helpers';
import { cancelGoingToEvent, goingToEvent } from '../../user/userActions';

const actions = {
  doCancelGoingToEvent: cancelGoingToEvent,
  doGoingToEvent: goingToEvent,
};

const mapState = (state, ownProps) => {
  const { id } = ownProps.match.params;
  let event = {};

  if (state.firestore.data.events) {
    const { events } = state.firestore.data;
    if (objectHasKey(events, id)) {
      event = state.firestore.data.events[id];
    }
  }

  // if (
  //   state.firestore.ordered.events
  //   && state.firestore.ordered.events[0]
  // ) {
  //   /* destructuring does not match this use case very well */
  //   /* eslint-disable */
  //   event = state.firestore.ordered.events[0];

  //   if (state.firestore.ordered.events.length > 0) {
  //     event = Object.assign({}, state.firestore.ordered.events.filter(evt => evt.id === id)[0]);
  //   }
  // }

  return {
    event,
    auth: state.firebase.auth,
  };
};

class EventDetailedPage extends React.Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    const { id } = match.params;

    await firestore.setListener(
      `events/${id}`,
    );
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    const { id } = match.params;

    await firestore.unsetListener(
      `events/${id}`,
    );
  }

  render() {
    const {
      auth,
      doCancelGoingToEvent,
      doGoingToEvent,
      event,
    } = this.props;
    const attendees = event
      && event.attendees
      && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(
      a => a.id === auth.uid
    );

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            cancelGoingToEvent={doCancelGoingToEvent}
            goingToEvent={doGoingToEvent}
            isGoing={isGoing}
            isHost={isHost}
            event={event}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

EventDetailedPage.defaultProps = {
  event: {},
};

EventDetailedPage.propTypes = {
  event: PropTypes.shape(),
  doCancelGoingToEvent: PropTypes.func.isRequired,
  doGoingToEvent: PropTypes.func.isRequired,
};

export default withFirestore(
  connect(mapState, actions)(EventDetailedPage)
);
