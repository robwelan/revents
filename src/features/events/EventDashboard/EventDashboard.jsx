import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  firestoreConnect,
} from 'react-redux-firebase';
import {
  Grid,
  Loader,
} from '../../../frameworks/semantic-ui-react/scripts';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import RecentActivity from '../EventActivity/EventActivity';
import { getEventsForDashboard } from '../eventActions';

const actions = {
  doGetEventsForDashboard: getEventsForDashboard,
};

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
});

class EventDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreEvents: false,
      loadedEvents: [],
      loadingInitial: true,
    };

    this.getNextEvents = this.getNextEvents.bind(this);
  }

  async componentDidMount() {
    const { doGetEventsForDashboard } = this.props;
    const next = await doGetEventsForDashboard();

    /* eslint no-underscore-dangle: 0 */
    this._isMounted = true;

    if (this._isMounted) {
      if (next && next.docs && next.docs.length >= 0) {
        this.setState({
          moreEvents: true,
          loadingInitial: false,
        });
      }

      if (next) {
        if (next.empty) {
          this.setState({
            moreEvents: false,
            loadingInitial: false,
          });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { events } = this.props;
    const nextEvents = nextProps.events;
    const { loadedEvents } = this.state;

    if (events !== nextEvents) {
      this.setState({
        loadedEvents: [
          ...loadedEvents,
          ...nextEvents,
        ],
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getNextEvents() {
    const { doGetEventsForDashboard, events } = this.props;
    const lastEvent = events && events[events.length - 1];
    const next = await doGetEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false,
      });
    }
  }

  render() {
    const { loading } = this.props;
    const {
      loadedEvents,
      loadingInitial,
      moreEvents,
    } = this.state;

    if (loadingInitial) {
      return (
        <LoadingComponent
          inverted
        />
      );
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
            loading={loading}
            moreEvents={moreEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}

EventDashboard.defaultProps = {
  events: [],
};

EventDashboard.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  loading: PropTypes.bool.isRequired,
};

export default connect(mapState, actions)(
  firestoreConnect(
    [{ collection: 'events' }],
  )(EventDashboard),
);
