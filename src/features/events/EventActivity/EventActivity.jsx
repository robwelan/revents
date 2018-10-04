import React from 'react';
import { Header, Segment } from '../../../frameworks/semantic-ui-react/scripts';

const EventActivity = () => {
  return (
    <React.Fragment>
      <Header
        attached="top"
        content="recent activity"
      />
      <Segment
        attached
      >
        <p>
          Recent Activity
        </p>
      </Segment>
    </React.Fragment>
  );
};

export default EventActivity;
