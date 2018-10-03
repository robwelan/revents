import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import {
  Button,
  Container,
  Menu,
} from '../../../frameworks/semantic-ui-react/scripts';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';

const actions = {
  doLogout: logout,
  doOpenModal: openModal,
};

const mapState = state => ({
  auth: state.auth,
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
    const { doLogout, history } = this.props;

    doLogout();
    history.push('/');
  }

  render() {
    const {
      auth: {
        authenticated,
        currentUser,
      },
    } = this.props;

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
                currentUser={currentUser}
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

export default withRouter(connect(mapState, actions)(NavBar));
