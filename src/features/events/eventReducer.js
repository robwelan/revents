import createReducer from '../../app/common/util/reducerUtil';
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from './eventConstants';

const initialState = [];

export const createEvent = (state, payload) => (
  [
    ...state,
    Object.assign({}, payload.event),
  ]
);

export const deleteEvent = (state, payload) => (
  [
    ...state.filter(event => event.id !== payload.eventId),
  ]
);

export const fetchEvents = (state, payload) => payload.events;

export const updateEvent = (state, payload) => (
  [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event),
  ]
);

export default createReducer(
  initialState,
  {
    [CREATE_EVENT]: createEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENTS]: fetchEvents,
    [UPDATE_EVENT]: updateEvent,
  },
);
