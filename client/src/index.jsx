import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router.jsx';
import { AppContext } from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContext>
      <p className='bg-red-500 p-5 rounded-xl'>Hello User</p>
    {/* <Router/> */}
    </AppContext>
  </React.StrictMode>
);
