import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
//  import Loadable from 'react-loadable';
import { Container } from '../../frameworks/semantic-ui-react/scripts';
//  import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
//  import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
//  import EventForm from '../../features/events/EventForm/EventForm';
//  import HomePage from '../../features/home/HomePage';
//  import NavBar from '../../features/nav/NavBar/NavBar';
//  import ModalManager from '../../features/modals/ModalManager';
//  import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
//  import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
//  import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import UserIsAuthenticated from '../../features/auth/authWrapper';
//  import NotFound from './NotFound';

import {
  AsyncHomePage,
  AsyncEventDashboard,
  AsyncEventDetailedPage,
  AsyncEventForm,
  AsyncModalManager,
  AsyncNavBar,
  AsyncNotFound,
  AsyncPeopleDashboard,
  AsyncSettingsDashboard,
  AsyncUserDetailedPage,
} from './loadable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <AsyncModalManager />
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <React.Fragment>
              <AsyncNavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={AsyncEventDashboard} />
                  <Route path="/event/:id" component={AsyncEventDetailedPage} />
                  <Route
                    path="/manage/:id"
                    component={UserIsAuthenticated(AsyncEventForm)}
                  />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(AsyncPeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(AsyncUserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(AsyncSettingsDashboard)}
                  />
                  <Route
                    path="/createEvent"
                    component={UserIsAuthenticated(AsyncEventForm)}
                  />
                  <Route path="/error" component={AsyncNotFound} />
                  <Route component={AsyncNotFound} />
                </Switch>
              </Container>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
