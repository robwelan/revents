import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {
  Button,
  Container,
  Menu,
} from '../../../frameworks/semantic-ui-react/scripts';
import { openModal } from '../../modals/modalActions';

const actions = {
  doOpenModal: openModal,
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleRegister() {
    const { doOpenModal } = this.props;

    doOpenModal('RegisterModal');
  }

  handleSignIn() {
    const { doOpenModal } = this.props;

    doOpenModal('LoginModal');
  }

  handleSignOut() {
    const { firebase, history } = this.props;

    firebase.logout();
    history.push('/');
  }

  render() {
    const {
      auth,
      profile,
    } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item
            as={Link}
            to="/"
            header
          >
            <img
              alt="logo"
              src="/assets/logo.png"
            />
            Re-vents
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            name="Events"
            to="/events"
          />
          <Menu.Item
            as={NavLink}
            name="Test"
            to="/test"
          />
          {authenticated
            && (
              <React.Fragment>
                <Menu.Item
                  as={NavLink}
                  name="People"
                  to="/people"
                />
                <Menu.Item>
                  <Button
                    as={Link}
                    content="Create Event"
                    floated="right"
                    inverted
                    positive
                    to="/createEvent"
                  />
                </Menu.Item>
              </React.Fragment>
            )
          }
          {authenticated
            ? (
              <SignedInMenu
                profile={profile}
                signOut={this.handleSignOut}
              />
            )
            : (
              <SignedOutMenu
                register={this.handleRegister}
                signIn={this.handleSignIn}
              />
            )
          }
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
