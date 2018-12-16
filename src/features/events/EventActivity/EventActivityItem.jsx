import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Feed } from '../../../frameworks/semantic-ui-react/scripts';

class EventActivityItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderSummary = this.renderSummary.bind(this);
  }

  renderSummary(activity) {
    const { id } = this.props;

    let event = null;

    if (activity.type === 'newEvent') {
      event = [
        <div key={id}>
          {'New Event! '}
          <Feed.User
            as={Link}
            to={{ pathname: `/profile/${activity.hostUid}` }}
          >
            {activity.hostedBy}
          </Feed.User>
          {' is hosting '}
          <Link to={{ pathname: `/event/${activity.eventId}` }}>
            {activity.title}
          </Link>
        </div>,
      ];
    }

    if (activity.type === 'cancelledEvent') {
      event = [
        <div key={id}>
          {'Event Cancelled! '}
          <Feed.User
            as={Link}
            to={{ pathname: `/profile/${activity.hostUid}` }}
          >
            {activity.hostedBy}
          </Feed.User>
          {' has cancelled '}
          <Link to={{ pathname: `/event/${activity.eventId}` }}>
            {activity.title}
          </Link>
        </div>,
      ];
    }

    return event;
  }

  render() {
    const { activity } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt="" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary key={activity.id}>
            {this.renderSummary(activity)}
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWordsToNow(activity.timestamp.toDate())}
              {' ago'}
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

EventActivityItem.defaultProps = {
  activity: {},
  id: '',
};

EventActivityItem.propTypes = {
  activity: PropTypes.shape(),
  id: PropTypes.string,
};

export default EventActivityItem;
