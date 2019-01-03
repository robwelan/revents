import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from '../../../frameworks/semantic-ui-react/scripts';

const PersonCard = (props) => {
  const { user } = props;

  return (
    <Card as={Link} to={`/profile/${user.id}`}>
      <Image src={user.photoURL || '/assets/user.png'} />
      <Card.Content textAlign="center">
        <Card.Header content={user.displayName} />
      </Card.Content>
      <Card.Meta textAlign="center">
        <span>{user.city}</span>
      </Card.Meta>
    </Card>
  );
};

PersonCard.defaultProps = {
  user: {},
};

PersonCard.propTypes = {
  user: PropTypes.shape(),
};

export default PersonCard;
