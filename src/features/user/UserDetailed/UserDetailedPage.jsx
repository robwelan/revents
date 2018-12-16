import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import {
  Grid,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import UserDetailedAbout from './UserDetailedAbout';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedInterests from './UserDetailedInterests';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { userDetailedQuery } from '../userQueries';
import { getUserEvents } from '../userActions';

const actions = {
  doGetUserEvents: getUserEvents,
};

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  const { id } = ownProps.match.params;
  const { uid } = state.auth;

  if (id === uid) {
    profile = state.firebase.profile;
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = id;
  }

  return {
    auth: state.firebase.auth,
    events: state.events,
    eventsLoading: state.async.loading,
    photos: state.firestore.ordered.photos,
    profile,
    requesting: state.firestore.status.requesting,
    userUid,
  };
};

class UserDetailedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(e, data) {
    const { activeIndex } = data;
    const {
      doGetUserEvents,
      userUid,
    } = this.props;

    doGetUserEvents(userUid, activeIndex);
  }

  render() {
    const {
      auth,
      eventsLoading,
      events,
      match,
      photos,
      profile,
      requesting,
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingComponent inverted />;

    return (
      <Grid>
        <Grid.Column width={16}>
          <UserDetailedHeader
            profile={profile}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <UserDetailedAbout
                  profile={profile}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <UserDetailedInterests
                  interests={profile.interests}
                />
              </Grid.Column>
            </Grid>

          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <UserDetailedSidebar
            isCurrentUser={isCurrentUser}
          />
        </Grid.Column>

        <Grid.Column width={12}>
          {photos && photos.length > 0
            && (
              <UserDetailedPhotos
                photos={photos}
              />
            )
          }
        </Grid.Column>

        <Grid.Column width={12}>
          <UserDetailedEvents
            eventsLoading={eventsLoading}
            events={events}
            changeTab={this.changeTab}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

UserDetailedPage.defaultProps = {
  auth: {},
  events: [],
  eventsLoading: false,
  match: {},
  photos: [],
  profile: false || {},
  requesting: {},
  userUid: '',
};

UserDetailedPage.propTypes = {
  auth: PropTypes.shape(),
  doGetUserEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  eventsLoading: PropTypes.bool,
  match: PropTypes.shape(),
  photos: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  profile: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape(),
  ]),
  requesting: PropTypes.shape(),
  userUid: PropTypes.string,
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
