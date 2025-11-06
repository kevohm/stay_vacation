import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { AppContext } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext>
       <QueryClientProvider client={queryClient}>
      <Router />
       </QueryClientProvider>
    </AppContext>
  </React.StrictMode>
);
