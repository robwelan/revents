import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import {
  DELETE_EVENT,
  FETCH_EVENTS,
} from './eventConstants';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncActions';
import { createNewEvent } from '../../app/common/util/helpers';
import fetchSampleData from '../../app/data/mockApi';

export const createEvent = event => (
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const { photoURL } = getState().firebase.profile;
    const newEvent = createNewEvent(user, photoURL, event);

    try {
      const createdEvent = await firestore.add(
        'events',
        newEvent,
      );
      await firestore.set(
        `event_attendee/${createdEvent.id}_${user.uid}`,
        {
          eventId: createdEvent.id,
          userUid: user.uid,
          eventDate: event.date,
          host: true,
        },
      );
      toastr.success('Success!', 'Event has been created.');
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong.');
    }
  }
);

export const cancelToggle = (cancelled, eventId) => (
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const message = cancelled
      ? 'Are you sure you want to Cancel the Event?'
      : 'This will reactivate the Event - are you sure?';

    try {
      toastr.confirm(
        message,
        {
          onOk: () => firestore.update(
            `events/${eventId}`,
            {
              cancelled,
            },
          ),
        },
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteEvent = eventId => (
  {
    type: DELETE_EVENT,
    payload: {
      eventId,
    },
  }
);

export const fetchEvents = events => (
  {
    type: FETCH_EVENTS,
    payload: events,
  }
);

export const updateEvent = event => (
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let updatedEvent = {
      ...event,
    };

    try {
      if (
        event.date
        !== getState().firestore.ordered.events[0].date
      ) {
        const momentDate = moment(event.date).toDate();

        updatedEvent = {
          ...event,
          date: momentDate,
        };
      }

      await firestore.update(`events/${event.id}`, updatedEvent);
      toastr.success('Success!', 'Event has been updated.');
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong.');
    }
  }
);

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.error(error);
      dispatch(asyncActionError());
    }
  }
};
