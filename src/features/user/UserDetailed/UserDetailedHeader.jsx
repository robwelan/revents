import PropTypes from 'prop-types';
import React from 'react';
import differenceInYears from 'date-fns/difference_in_years';
import {
  Item,
  Header,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

const UserDetailedHeader = (props) => {
  const { profile } = props;
  let age = 'Unknown Age';
  let job = 'Unknown Occupation';
  let location = 'Unknown Location';
  let name = 'User';
  let photo = '/assets/user.png';

  if (profile.city) {
    location = profile.city;
  }

  if (profile.dateOfBirth) {
    const dNow = Date.now();
    const dDoB = profile.dateOfBirth.toDate();
    age = differenceInYears(dNow, dDoB);
  }

  if (profile.displayName) {
    name = profile.displayName;
  }

  if (profile.occupation) {
    job = profile.occupation;
  }

  if (profile.photoURL) {
    photo = profile.photoURL;
  }

  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image
            avatar
            size="small"
            src={photo}
          />
          <Item.Content
            verticalAlign="bottom"
          >
            <Header
              as="h1"
            >
              {name}
            </Header>
            <br />
            <Header
              as="h3"
            >
              {job}
            </Header>
            <br />
            <Header
              as="h3"
            >
              {age}
              {', Lives in '}
              {location}
            </Header>
          </Item.Content>
        </Item>
      </Item.Group>

    </Segment>
  );
};

UserDetailedHeader.defaultProps = {
  profile: {},
};

UserDetailedHeader.propTypes = {
  profile: PropTypes.shape(),
};

export default UserDetailedHeader;
