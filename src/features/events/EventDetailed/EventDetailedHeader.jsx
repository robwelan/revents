import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
  Button,
  Header,
  Image,
  Item,
  Label,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const EventDetailedHeader = (props) => {
  const {
    cancelGoingToEvent,
    event,
    goingToEvent,
    isAuthenticated,
    isGoing,
    isHost,
    loading,
    openModal,
  } = props;
  let eventDate;

  if (event.date) {
    eventDate = format(event.date.toDate(), 'dddd Do MMMM');
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          fluid
          src={`/assets/categoryImages/${event.category}.jpg`}
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{eventDate}</p>
                <p>
                  {'Hosted by'}
                  <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <React.Fragment>
            {isGoing && !event.cancelled && (
              <Button onClick={() => cancelGoingToEvent(event)}>
                {'Cancel My Place'}
              </Button>
            )}
            {!isGoing && isAuthenticated && !event.cancelled && (
              <Button
                color="teal"
                loading={loading}
                onClick={() => goingToEvent(event)}
              >
                {'JOIN THIS EVENT'}
              </Button>
            )}
            {!isAuthenticated && !event.cancelled && (
              <Button
                color="teal"
                loading={loading}
                onClick={() => openModal('UnauthModal')}
              >
                {'JOIN THIS EVENT'}
              </Button>
            )}
            {event.cancelled && !isHost && (
              <Label
                color="red"
                content="This Event Has Been Cancelled."
                size="large"
              />
            )}
          </React.Fragment>
        )}

        {isHost && (
          <Button as={Link} color="orange" to={`/manage/${event.id}`}>
            {'Manage Event'}
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

EventDetailedHeader.defaultProps = {
  isAuthenticated: false,
  isGoing: false,
  isHost: false,
  event: {},
};

EventDetailedHeader.propTypes = {
  cancelGoingToEvent: PropTypes.func.isRequired,
  goingToEvent: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isGoing: PropTypes.bool,
  isHost: PropTypes.bool,
  event: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default EventDetailedHeader;
