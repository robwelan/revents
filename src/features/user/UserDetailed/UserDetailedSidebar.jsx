import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Segment } from '../../../frameworks/semantic-ui-react/scripts';

const UserDetailedSideBar = (props) => {
  const {
    followUser,
    isCurrentUser,
    isFollowing,
    profile,
    unfollowUser,
  } = props;

  return (
    <Segment>
      {isCurrentUser && (
        <Button
          as={Link}
          basic
          color="teal"
          content="Edit Profile"
          fluid
          to="/settings"
        />
      )}

      {!isCurrentUser && !isFollowing && (
        <Button
          basic
          color="teal"
          content="Follow User"
          fluid
          onClick={() => followUser(profile)}
        />
      )}

      {!isCurrentUser && isFollowing && (
        <Button
          basic
          color="teal"
          content="Unfollow User"
          fluid
          onClick={() => unfollowUser(profile)}
        />
      )}
    </Segment>
  );
};

UserDetailedSideBar.defaultProps = {
  isCurrentUser: false,
  isFollowing: false,
  profile: false || {},
};

UserDetailedSideBar.propTypes = {
  followUser: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool,
  isFollowing: PropTypes.bool,
  profile: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  unfollowUser: PropTypes.func.isRequired,
};

export default UserDetailedSideBar;
