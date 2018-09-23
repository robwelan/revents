import React, { Component } from 'react';
import cuid from 'cuid';
import { Button, Grid } from '../../../frameworks/semantic-ui-react';

import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const dummyEvents = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
    ],
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
    ],
  },
];

class EventDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: dummyEvents,
      isOpen: false,
      selectedEvent: null,
    };

    // attach methods
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleOpenEvent = this.handleOpenEvent.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleUdpatedEvent = this.handleUdpatedEvent.bind(this);
  }


  handleCancel() {
    this.setState({
      isOpen: false,
    });
  }

  handleCreateEvent(event) {
    const { events } = this.state;
    const newEvent = {
      ...event,
      id: cuid(),
      hostPhotoURL: '/assets/user.png',
    };
    // newEvent.id = cuid();
    // newEvent.hostPhotoURL = '/assets/user.png';

    const updatedEvents = [
      ...events,
      newEvent,
    ];

    this.setState({
      events: updatedEvents,
      isOpen: false,
    });
  }

  handleDeleteEvent(eventId) {
    return () => {
      const { events } = this.state;
      const updatedEvents = events.filter(e => e.id !== eventId);

      this.setState({
        events: updatedEvents,
      });
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
  handleOpenEvent(eventToOpen) {
    return () => {
      this.setState({
        isOpen: true,
        selectedEvent: eventToOpen,
      });
    };
  }

  handleFormOpen() {
    this.setState({
      isOpen: true,
      selectedEvent: null,
    });
  }

  handleUdpatedEvent(updatedEvent) {
    const { events } = this.state;

    this.setState({
      events: events.map((event) => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        }

        return event;
      }),
      isOpen: false,
      selectedEvent: null,
    });
  }

  render() {
    const { events, isOpen, selectedEvent } = this.state;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={events}
            onEventOpen={this.handleOpenEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            content="Create Event"
            onClick={this.handleFormOpen}
            positive
          />
          {isOpen
            && (
              <EventForm
                createEvent={this.handleCreateEvent}
                handleCancel={this.handleCancel}
                selectedEvent={selectedEvent}
                updateEvent={this.handleUdpatedEvent}
              />
            )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
