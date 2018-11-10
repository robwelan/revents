import PropTypes from 'prop-types';
import React from 'react';
import format from 'date-fns/format';
import {
  Header,
} from '../../../frameworks/semantic-ui-react/scripts';

const UserDetailedAbout = (props) => {
  const { profile } = props;
  let date;
  let description;
  let job = 'Occupation';
  let name = 'About You';
  let from;

  if (profile.about) {
    description = profile.about;
  }

  if (profile.createdAt) {
    date = format(profile.createdAt.toDate(), 'DD MMMM YYYY');
  }

  if (profile.displayName) {
    name = `About ${profile.displayName}`;
  }

  if (profile.occupation) {
    job = profile.occupation;
  }

  if (profile.origin) {
    from = profile.origin;
  }

  return (
    <React.Fragment>
      <Header
        content={name}
        icon="smile"
      />
      <p>
        {'I am a: '}
        <strong>
          {job}
        </strong>
      </p>
      <p>
        {'Originally from '}
        <strong>
          {from}
        </strong>
      </p>
      <p>
        {'Member Since: '}
        <strong>
          {date}
        </strong>
      </p>
      <p>
        {description}
      </p>
    </React.Fragment>
  );
};

UserDetailedAbout.defaultProps = {
  profile: {},
};

UserDetailedAbout.propTypes = {
  profile: PropTypes.shape(),
};

export default UserDetailedAbout;
