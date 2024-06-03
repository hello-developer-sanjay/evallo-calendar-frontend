import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../actions/eventActions';
import useAuth from '../hooks/useAuth';
import EventForm from './EventForm';
import GoogleCalendarSync from './GoogleCalendarSync';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Calendar = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, token } = useAuth();
  const events = useSelector(state => state.events.events);
  const googleCalendarEvents = useSelector(state => state.googleCalendar.googleCalendarEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getEvents(token));
    }
  }, [dispatch, isAuthenticated, token]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({
      start: slotInfo.start,
      end: slotInfo.end,
      title: '',
      description: '',
      participants: '',
      date: '',
      time: '',
      duration: '',
      sessionNotes: '',
    });
    setShowEventForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleCreateEvent = (eventData) => {
    dispatch(createEvent(eventData, token));
    setShowEventForm(false);
  };

  const handleUpdateEvent = (eventData) => {
    dispatch(updateEvent(selectedEvent._id, eventData, token));
    setShowEventForm(false);
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(selectedEvent._id, token));
    setShowEventForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  const formatEvents = (events) => {
    return events.map(event => ({
      ...event,
      start: new Date(event.date),
      end: new Date(event.date),
    }));
  };

  const mergedEvents = formatEvents([...events, ...googleCalendarEvents]);

  return (
    <Container>
      <Title>My Calendar</Title>
      <BigCalendar
        localizer={momentLocalizer(moment)}
        events={mergedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      {showEventForm && selectedEvent && (
        <EventForm  
          event={selectedEvent}
          onClose={() => setShowEventForm(false)}
          onCreate={handleCreateEvent}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
      <GoogleCalendarSync />
    </Container>
  );
};

export default Calendar;
