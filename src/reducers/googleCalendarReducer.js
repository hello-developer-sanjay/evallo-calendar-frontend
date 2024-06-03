import { SYNC_GOOGLE_CALENDAR } from '../actions/types';

const initialState = {
  googleCalendarEvents: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SYNC_GOOGLE_CALENDAR:
      return {
        ...state,
        googleCalendarEvents: action.payload.syncedEvents.map(event => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date), // Again, adjust this based on duration
        })),
      };
    default:
      return state;
  }
}
