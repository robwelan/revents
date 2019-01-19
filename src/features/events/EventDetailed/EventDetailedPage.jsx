import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, withFirestore, isEmpty } from 'react-redux-firebase';
import { Grid } from '../../../frameworks/semantic-ui-react/scripts';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import {
  createDataTree,
  objectHasKey,
  objectToArray,
} from '../../../app/common/util/helpers';
import { cancelGoingToEvent, goingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';

const actions = {
  doAddEventComment: addEventComment,
  doCancelGoingToEvent: cancelGoingToEvent,
  doGoingToEvent: goingToEvent,
  doOpenModal: openModal,
};

const mapState = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const eventChat = !isEmpty(state.firebase.data.event_chat)
    ? objectToArray(state.firebase.data.event_chat[id])
    : [];
  let event = {};

  if (state.firestore.data.events) {
    const { events } = state.firestore.data;
    if (objectHasKey(events, id)) {
      event = state.firestore.data.events[id];
      event = {
        ...event,
        id,
      };
    }
  }

  return {
    auth: state.firebase.auth,
    event,
    eventChat,
    loading: state.async.loading,
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
      doAddEventComment,
      doCancelGoingToEvent,
      doGoingToEvent,
      doOpenModal,
      event,
      eventChat,
      loading,
    } = this.props;
    const attendees = event
      && event.attendees
      && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(
      a => a.id === auth.uid,
    );
    const chatTree = !isEmpty(eventChat)
      ? createDataTree(eventChat) : [];
    const isAuthenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            cancelGoingToEvent={doCancelGoingToEvent}
            goingToEvent={doGoingToEvent}
            isAuthenticated={isAuthenticated}
            isGoing={isGoing}
            isHost={isHost}
            event={event}
            loading={loading}
            openModal={doOpenModal}
          />
          <EventDetailedInfo event={event} />
          {
            isAuthenticated
            && (
              <EventDetailedChat
                addEventComment={doAddEventComment}
                eventChat={chatTree}
                eventId={event.id}
              />
            )
          }
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

EventDetailedPage.defaultProps = {
  auth: {},
  event: {},
  eventChat: [],
};

EventDetailedPage.propTypes = {
  auth: PropTypes.shape(),
  doAddEventComment: PropTypes.func.isRequired,
  doCancelGoingToEvent: PropTypes.func.isRequired,
  doGoingToEvent: PropTypes.func.isRequired,
  doOpenModal: PropTypes.func.isRequired,
  event: PropTypes.shape(),
  eventChat: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  loading: PropTypes.bool.isRequired,
};

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect(
    props => ([`event_chat/${props.match.params.id}`]),
  ),
)(EventDetailedPage);
