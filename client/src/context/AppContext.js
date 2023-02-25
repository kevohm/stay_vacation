import axios from "axios";
import React, {useContext, createContext} from "react"
import { useEffect } from "react";
import { useReducer } from "react";
import { actions, initialState } from "./appActions";
import {reducer} from "./appReducer"
const appContext = createContext();

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const client = axios.create({ 
    baseURL: "http://localhost:5000/v1",
    withCredentials: true,
  });
  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        logout()
      }
      return Promise.reject(error);
    }
  );
  const getUser = async () => {
    try {
      const { data } = await client.get(`users/user`);
      const {id, role} = data.user
      dispatch({type:actions.UPDATE_USER, payload:{userData:{id,role}}})
    } catch (error) {
      console.log(error)
    }
  }
  const logout = async () => {
    try {
      await client.post("auth/logout");
      dispatch({
        type: actions.LOGOUT,
        payload: { userD: { id: null, role: null } },
      });
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
        getUser()
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
      const date = [{ "1": "Mon" }, { "2": "Tue" }, {"3": "Wed"}, {"4": "Thu"}, {"5": "Fri"}, {"6": "Sat"}, {"0":"Sun"}]
      const { data } = await client.get(`stats/all/${type}?time=${time}`);
      let table = {category:[], series:[]}
      const newData = data[type].map((elem) => {
          if (time === "day") {
            const { _id: { day }, count } = elem
            console.log(day, count);
            for (let i in date) {
              console.log(i)
            }
          }
          return elem
        })
      console.log(table);
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
  useEffect(() => {
    getUser()
  },[])
  return (
    <appContext.Provider
      value={{
        state,
        getStats,
        getTableStats,
        getUsers,
        getEvents,
        handleUser,
        logout,
        getUser,
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