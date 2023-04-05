import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Landing,
  Booking,
  Dashboard,
  Events,
  SingleEvent,
  SiteDetails,
  User,
  Error,
  Payment,
  Wrapper,
  Report,
  Register,
  DashboardWrapper,
  Profile,
  BookEvent
} from "./pages/index";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { EventContext } from './components/Events/context/EventContext';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />}>
      <Route path="/" element={<EventContext> <Wrapper /></EventContext>}>
        <Route index element={<Landing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:name" element={<SingleEvent />} />
        <Route path="events/:name/:eventId" element={<BookEvent />} />
        <Route path="info" element={<SiteDetails />} />
        <Route path="info/:infoTab" element={<SiteDetails />} />
      </Route>
      <Route path="register/login" element={<Register />} />
      <Route path="register" element={<Register />} />
      <Route path="admin" element={<DashboardWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Booking />} />
        <Route path="users" element={<User />} />
        <Route path="reports" element={<Report />} />
        <Route path="payments" element={<Payment />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContext>
    <RouterProvider router={router} />
    </AppContext>
  </React.StrictMode>
);
