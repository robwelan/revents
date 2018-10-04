import { toastr } from 'react-redux-toastr';
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
  async (dispatch) => {
    try {
      dispatch(
        {
          type: CREATE_EVENT,
          payload: {
            event,
          },
        },
      );
      toastr.success('Success!', 'Event has been created.');
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong.');
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
  async (dispatch) => {
    try {
      dispatch(
        {
          type: UPDATE_EVENT,
          payload: {
            event,
          },
        },
      );
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
