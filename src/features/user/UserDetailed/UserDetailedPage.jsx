import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import {
  Card, Grid,
  Header,
  Image,
  Menu,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';
import UserDetailedAbout from './UserDetailedAbout';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedInterests from './UserDetailedInterests';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { userDetailedQuery } from '../userQueries';

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
  }

  render() {
    const {
      auth,
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
          <Segment attached>
            <Header icon='calendar' content='Events' />
            <Menu secondary pointing>
              <Menu.Item name='All Events' active />
              <Menu.Item name='Past Events' />
              <Menu.Item name='Future Events' />
              <Menu.Item name='Events Hosted' />
            </Menu>

            <Card.Group itemsPerRow={5}>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'} />
                <Card.Content>
                  <Card.Header textAlign='center'>
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign='center'>
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'} />
                <Card.Content>
                  <Card.Header textAlign="center">
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

UserDetailedPage.defaultProps = {
  photos: [],
  profile: false || {},
};

UserDetailedPage.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  profile: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape(),
  ]),
};

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
