import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import GoogleCalendarSync from './components/GoogleCalendarSync';
import Layout from './components/Layout'; 
import Login from './pages/Login';
const App = () => {
  return (
    <Router>
                      <Layout>

      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/login" element={<Login />} />



        <Route path="/sync-google-calendar" element={<GoogleCalendarSync />} />
      </Routes>
      </Layout>

    </Router>
  );
};

export default App;
