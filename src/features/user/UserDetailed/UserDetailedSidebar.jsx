import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

const UserDetailedSideBar = (props) => {
  const { isCurrentUser } = props;

  return (
    <Segment>
      {
        isCurrentUser
          ? (
            <Button
              as={Link}
              basic
              color="teal"
              content="Edit Profile"
              fluid
              to="/settings"
            />
          ) : (
            <Button
              basic
              color="teal"
              content="Follow User"
              fluid
            />
          )
      }
    </Segment>
  );
};

UserDetailedSideBar.defaultProps = {
  isCurrentUser: false,
};

UserDetailedSideBar.propTypes = {
  isCurrentUser: PropTypes.bool,
};

export default UserDetailedSideBar;
