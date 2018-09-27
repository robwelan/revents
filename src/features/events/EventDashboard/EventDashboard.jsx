import React, { Component } from 'react';
import { connect } from 'react-redux';
// import cuid from 'cuid';
import { Grid } from '../../../frameworks/semantic-ui-react';
import EventList from '../EventList/EventList';
// import EventForm from '../EventForm/EventForm';
import { deleteEvent } from '../eventActions';

const actions = {
  //  doCreateEvent: createEvent,
  doDeleteEvent: deleteEvent,
  //  doUpdateEvent: updateEvent,
};

const mapState = state => ({
  events: state.events,
});

class EventDashboard extends Component {
  //  constructor(props) {
  //    super(props);

  // this.state = {
  //   isOpen: false,
  //   selectedEvent: null,
  // };

  // attach methods
  // this.handleCancel = this.handleCancel.bind(this);
  // this.handleCreateEvent = this.handleCreateEvent.bind(this);
  // this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
  // this.handleOpenEvent = this.handleOpenEvent.bind(this);
  // this.handleFormOpen = this.handleFormOpen.bind(this);
  // this.handleUdpatedEvent = this.handleUdpatedEvent.bind(this);
  //  }


  // handleCancel() {
  //   this.setState({
  //     isOpen: false,
  //   });
  // }

  // handleCreateEvent(event) {
  //   const { doCreateEvent } = this.props;
  //   const newEvent = {
  //     ...event,
  //     id: cuid(),
  //     hostPhotoURL: '/assets/user.png',
  //   };
  //   // newEvent.id = cuid();
  //   // newEvent.hostPhotoURL = '/assets/user.png';

  //   doCreateEvent(newEvent);

  //   this.setState({
  //     isOpen: false,
  //   });
  // }

  handleDeleteEvent(eventId) {
    return () => {
      const { doDeleteEvent } = this.props;

      doDeleteEvent(eventId);
    };
  }

  // tutorial way
  // handleOpenEvent = (eventToOpen) => () => {
  //   this.setState({
  //     isOpen: true,
  //     selectedEvent: eventToOpen,
  //   });
  // }
  // airbnb way
  // handleOpenEvent(eventToOpen) {
  //   return () => {
  //     this.setState({
  //       isOpen: true,
  //       selectedEvent: eventToOpen,
  //     });
  //   };
  // }

  // handleFormOpen() {
  //   this.setState({
  //     isOpen: true,
  //     selectedEvent: null,
  //   });
  // }

  // handleUdpatedEvent(updatedEvent) {
  //   const { doUpdateEvent } = this.props;

  //   doUpdateEvent(updatedEvent);

  //   this.setState({
  //     isOpen: false,
  //     selectedEvent: null,
  //   });
  // }

  render() {
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>

        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
