import PropTypes from 'prop-types';
import React from 'react';
import EventActivityItem from './EventActivityItem';
import {
  Feed,
  Header,
  Segment,
  Sticky,
} from '../../../frameworks/semantic-ui-react/scripts';

const EventActivity = (props) => {
  const { activities, contextRef } = props;

  return (
    <Sticky context={contextRef} offset={100}>
      <Header attached="top" content="recent activity" />
      <Segment attached>
        <Feed>
          {activities
            && activities.map(activity => (
              <EventActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
};

EventActivity.defaultProps = {
  activities: [],
};

EventActivity.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape()),
};

export default EventActivity;
