import React from 'react'
import {
    Protection,
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

import { About, Terms, Contacts } from "./components/info/index"

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { EventContext } from './components/Events/context/EventContext';

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<EventContext> <Wrapper /></EventContext>}>
                <Route index element={<Landing />} />
                <Route path="profile" element={<Profile />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:name" element={<SingleEvent />} />
                <Route path="events/:name/:eventId" element={<BookEvent />} />
                <Route path="info/about" element={<SiteDetails><About /></SiteDetails>} />
                <Route path="info/contact" element={<SiteDetails><Contacts /></SiteDetails>} />
                <Route path="info" element={<SiteDetails><Terms /></SiteDetails>} />
            </Route>
            <Route path="register/login" element={<Register />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<Protection><DashboardWrapper /></Protection>}>
                <Route index element={<Dashboard />} />
                <Route path="bookings" element={<Booking />} />
                <Route path="users" element={<User />} />
                <Route path="reports" element={<Report />} />
                <Route path="payments" element={<Payment />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter>
}

export default Router