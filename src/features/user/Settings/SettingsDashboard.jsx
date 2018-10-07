import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from '../../../frameworks/semantic-ui-react/scripts';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';
import SettingsNav from './SettingsNav';
import { updatePassword } from '../../auth/authActions';

const actions = {
  doUpdatePassword: updatePassword,
};

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
});

const SettingsDashboard = (props) => {
  const { doUpdatePassword, providerId } = props;

  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" component={BasicPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={otherProps => (
              <AccountPage
                {...otherProps}
                providerId={providerId}
                updatePassword={doUpdatePassword}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState, actions)(SettingsDashboard);
