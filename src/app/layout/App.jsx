import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
