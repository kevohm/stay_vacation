import axios from "axios";
import React, {useContext, createContext} from "react"
import { useReducer } from "react";
import { actions, initialState } from "./appActions";
import {reducer} from "./appReducer"
const appContext = createContext();

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const client = axios.create({
    baseURL: "https://tough-teal-cod.cyclic.app/v1/",
  });
  const getUser = async (userID) => {
    try {
      const { data } = client.get(`users/${userID}`);
      const { id, role } = data
      dispatch({type:actions.UPDATE_USER, payload:{userData:{id,role}}})
    } catch (error) {
      console.log(error)
    }
  }
  const handleUser = async (body, type) => {
    const login = type === "login"
    let url = (login) ? "auth/login":"auth"
    try {
      const { data } = await client.post(url, body);
      if (login) {
      } else {
        dispatch({ type: actions.REGISTER});
      }
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  const getEvents = async () => {
    try {
      const { data } = await client.get(`event/all`);
      const { events } = data;
      dispatch({
        type: actions.GET_EVENTS,
        payload: { allData: events },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const { data } = await client.get(`users`);
      const {users} = data
      dispatch({
        type: actions.GET_USERS,
        payload:{all:users}
      })
    } catch (error) {
      console.log(error)
    }
  }
  const getTableStats = async (type="events", time="day") => {
    try {
      const { data } = await client.get(`stats/all/${type}?time=${time}`);
      dispatch({
        type: actions[`GET_TABLE_${type.toUpperCase()}`],
        payload:{[type]:data[type]}
      })
    } catch (error) {
      console.log(error)
    }
  }
  const getStats = async () => {
    try {
      const { data } = await client.get(`stats` );
      const {events, users} = data
      dispatch({
        type: actions.GET_STATS,
        payload: {
          stats: {
            bookings: events.total,
            users,
            successful: events.success,
            failed: events.fail,
          },
        },
      });
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <appContext.Provider
      value={{
        state,
        getStats,
        getTableStats,
        getUsers,
        getEvents,
        handleUser,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
const useGlobal = () => {
    return useContext(appContext)
}

export { AppContext , useGlobal}