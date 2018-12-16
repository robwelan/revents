import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import {
  FETCH_EVENTS,
} from './eventConstants';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncActions';
import { createNewEvent } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';

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
          eventDate: newEvent.date,
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

const returnEvent = (data, id) => (
  {
    ...data,
    id,
  }
);

export const getEventsForDashboard = lastEvent => (
  async (dispatch, getState) => {
    try {
      dispatch(asyncActionStart());

      const today = new Date(Date.now());
      const firestore = firebase.firestore();
      const eventsRef = firestore.collection('events');
      const startAfter = lastEvent && await firestore.collection('events').doc(lastEvent.id).get();

      let query;

      if (lastEvent) {
        query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2);
      } else {
        query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .limit(2);
      }

      const querySnap = await query.get();

      if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish());
        return querySnap;
      }

      const events = [];
      let event = {};

      for (let i = 0; i < querySnap.docs.length; i += 1) {
        event = returnEvent(
          querySnap.docs[i].data(),
          querySnap.docs[i].id,
        );

        events.push(event);
      }

      dispatch({
        type: FETCH_EVENTS,
        payload: { events },
      });
      dispatch(asyncActionFinish());
      return querySnap;
    } catch (error) {
      console.error(error);
      dispatch(asyncActionError());
    }
  }
);

export const addEventComment = (eventId, parentId, values) => (
  async (dispatch, getState, { getFirebase }) => {
    const pFirebase = getFirebase();
    const { profile } = getState().firebase;
    const user = pFirebase.auth().currentUser;
    const newComment = {
      date: Date.now(),
      displayName: profile.displayName,
      parentId,
      photoURL: profile.photoURL || '/assets/user.png',
      text: values.comment,
      uid: user.uid,
    };

    try {
      await pFirebase.push(
        `event_chat/${eventId}`,
        newComment,
      );
    } catch (error) {
      console.error(error);
      toastr.error('Oops', 'Problem adding comments.');
    }
  }
);
