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
  Wrapper,
  Register,
  DashboardWrapper,
} from "./pages/index";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />}>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<Landing />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:eventId" element={<SingleEvent />} />
        <Route path="info/" element={<SiteDetails />} />
        <Route path="info/:infoTab" element={<SiteDetails />} />
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="register/login" element={<Register />} />
      <Route path="admin" element={<DashboardWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="booking" element={<Booking />} />
        <Route path="users" element={<User />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
