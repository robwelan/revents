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
import { updateProfile } from '../userActions';

const actions = {
  doUpdatePassword: updatePassword,
  doUpdateProfile: updateProfile,
};

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
});

const SettingsDashboard = (props) => {
  const {
    doUpdatePassword,
    doUpdateProfile,
    providerId,
    user,
  } = props;

  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => (
              <BasicPage
                initialValues={user}
                updateProfile={doUpdateProfile}
              />
            )}
          />
          <Route
            path="/settings/about"
            render={() => (
              <AboutPage
                initialValues={user}
                updateProfile={doUpdateProfile}
              />
            )}
          />
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
