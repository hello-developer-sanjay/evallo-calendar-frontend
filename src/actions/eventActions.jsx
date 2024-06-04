// src/actions/eventActions.js
import axios from 'axios';
import { GET_EVENTS, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './types';

export const getEvents = (token) => async (dispatch) => {
  try {
    const res = await axios.get('https://evallo-calendar-api.onrender.com/api/events', {
      headers: { 'x-auth-token': token }
    });
    dispatch({ type: GET_EVENTS, payload: res.data });
  } catch (err) {
    console.error('Error getting events:', err);
    // You might want to dispatch an error action here or handle it appropriately
  }
};

export const createEvent = (eventData, token) => async (dispatch) => {
  try {
    const res = await axios.post('https://evallo-calendar-api.onrender.com/api/events/create', eventData, {
      headers: { 'x-auth-token': token }
    });
    dispatch({ type: CREATE_EVENT, payload: res.data });
  } catch (err) {
    console.error('Error creating event:', err);
    // You might want to dispatch an error action here or handle it appropriately
  }
};

export const updateEvent = (id, eventData, token) => async (dispatch) => {
  try {
    const res = await axios.put(`https://evallo-calendar-api.onrender.com/api/events/${id}`, eventData, {
      headers: { 'x-auth-token': token }
    });
    dispatch({ type: UPDATE_EVENT, payload: res.data });
  } catch (err) {
    console.error('Error updating event:', err);
    // You might want to dispatch an error action here or handle it appropriately
  }
};

export const deleteEvent = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`https://evallo-calendar-api.onrender.com/api/events/${id}`, {
      headers: { 'x-auth-token': token }
    });
    dispatch({ type: DELETE_EVENT, payload: id });
  } catch (err) {
    console.error('Error deleting event:', err);
    // You might want to dispatch an error action here or handle it appropriately
  }
};
