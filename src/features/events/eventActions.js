import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from './eventConstants';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncActions';
import fetchSampleData from '../../app/data/mockApi';

export const createEvent = event => (
  {
    type: CREATE_EVENT,
    payload: {
      event,
    },
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
  {
    type: UPDATE_EVENT,
    payload: {
      event,
    },
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
