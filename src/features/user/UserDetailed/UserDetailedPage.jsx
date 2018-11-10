import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  Button,
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

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
});

const query = ({ auth }) => [
  {
    collection: 'users',
    doc: auth.uid,
    subcollections: [
      {
        collection: 'photos',
      },
    ],
    storeAs: 'photos',
  },
];

class UserDetailedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { photos, profile } = this.props;

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
          <Segment>
            <Button
              as={Link}
              basic
              color="teal"
              content="Edit Profile"
              fluid
              to="/settings"
            />
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <UserDetailedPhotos
            photos={photos}
          />
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
                  <Card.Header textAlign='center'>
                    Event Title
                  </Card.Header>
                  <Card.Meta textAlign='center'>
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
  profile: {},
};

UserDetailedPage.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  profile: PropTypes.shape(),
};

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth)),
)(UserDetailedPage);
