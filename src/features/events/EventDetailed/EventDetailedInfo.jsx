import PropTypes from 'prop-types';
import React, { Component } from 'react';
import format from 'date-fns/format';
import EventDetailedMap from './EventDetailedMap';
import {
  Button,
  Grid,
  Icon,
  Segment,
} from '../../../frameworks/semantic-ui-react/scripts';

class EventDetailedInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
    };

    this.showMapToggle = this.showMapToggle.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      showMap: false,
    });
  }

  showMapToggle() {
    this.setState(prevState => ({
      showMap: !prevState.showMap,
    }));
  }

  render() {
    const { event } = this.props;
    const { showMap } = this.state;
    let eventDate;

    if (event.date) {
      eventDate = event.date.toDate();
    }

    const formattedDate = format(eventDate, 'dddd Do MMM');
    const formattedTime = format(eventDate, 'h:mm A');

    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {`${formattedDate} at ${formattedTime}`}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                content={showMap ? 'Hide Map' : 'Show Map'}
                color={showMap ? 'teal' : 'orange'}
                onClick={this.showMapToggle}
                size="tiny"
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {showMap
          && (
            <EventDetailedMap
              lat={event.venueLatLng.lat}
              lng={event.venueLatLng.lng}
            />
          )
        }
      </Segment.Group>
    );
  }
}

EventDetailedInfo.defaultProps = {
  event: {},
};

EventDetailedInfo.propTypes = {
  event: PropTypes.shape(),
};

export default EventDetailedInfo;
