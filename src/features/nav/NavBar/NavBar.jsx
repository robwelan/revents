import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';

import {
  Button,
  Container,
  Menu,
} from '../../../frameworks/semantic-ui-react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn() {
    this.setState({
      authenticated: true,
    });
  }

  handleSignOut() {
    const { history } = this.props;

    this.setState({
      authenticated: false,
    });

    history.push('/');
  }

  render() {
    const { authenticated } = this.state;

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
            ? <SignedInMenu signOut={this.handleSignOut} />
            : <SignedOutMenu signIn={this.handleSignIn} />
          }
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
