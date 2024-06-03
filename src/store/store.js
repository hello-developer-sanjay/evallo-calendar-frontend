  import { createStore, combineReducers, applyMiddleware } from 'redux';
  import {thunk }from 'redux-thunk';
  import { composeWithDevTools } from 'redux-devtools-extension';
  import authReducer from '../reducers/authReducer';
  import eventReducer from '../reducers/eventReducer';
  import googleCalendarReducer from '../reducers/googleCalendarReducer';
  import settingsReducer from '../reducers/settingsReducer'; 

  const rootReducer = combineReducers({
    auth: authReducer,
    events: eventReducer,
    googleCalendar: googleCalendarReducer,
    settings: settingsReducer,

  });

  const initialState = {};

  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  export default store;
