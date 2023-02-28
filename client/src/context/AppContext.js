import axios from "axios";
import React, {useContext, createContext} from "react"
import { useEffect } from "react";
import { useReducer } from "react";
import { actions, initialState } from "./appActions";
import { reducer } from "./appReducer"
const appContext = createContext();

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const client = axios.create({
    baseURL: "http://localhost:5000/v1",
    withCredentials: true,
  });
//authentication
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
      dispatch({ type: actions.UPDATE_USER, payload: { userData: { id, role } } })
      localStorage.setItem("user", JSON.stringify({ id, role }));
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
      localStorage.setItem("user", JSON.stringify({ id: null, role: null }));
    } catch (error) {
      console.log(error)
    }
  }
  const handleUser = async (body, type) => {
    const createdAt = new Date().toISOString();
    const login = type === "login"
    let url = (login) ? "auth/login":"auth"
    try {
      const { data } = await client.post(url, { ...body, createdAt });
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
//events
  const getEvents = async (page=1, limit=5) => {
    try {
      const { data } = await client.get(`event/all?page=${page}&limit=${limit}`);
      const { events, pages } = data;
      dispatch({
        type: actions.GET_EVENTS,
        payload: { allData: events, page:pages },
      });
    } catch (error) {
      setLoading("events", false);
      console.log(error);
    }
  };
//utils
  const setLoading = (type, status) => {
    dispatch({ type: actions.SET_LOAD, payload: { type, load: status } })
  }
  const setDefaults = () => {
    setTimeout(() => dispatch(
    {type:actions.ERROR_DEFAULT}
    ), 3000)
  } 
  const setError = (type, err) => {
    dispatch({
      type: actions.SET_ERROR,
      payload: {err, typeData:type },
    });
  }
  const startError = (type, err) => {
    setError(type, err);
    setDefaults()
  };
// users
  const getUsers = async (page = 1, limit = 5, sort = "createdAt", arrange = "desc") => {
    const mapSort = {
      "email": "email",
      "Phone number": "phone_number",
      "username": "username",
      "created at": "createdAt",
      "updated at": "updatedAt",
    };
        
    try {
      const { data } = await client.get(
        `users?page=${page}&limit=${limit}&sort=${mapSort[sort]}&arrange=${arrange}`
      );
      const { users, pages } = data;
      dispatch({
        type: actions.GET_USERS,
        payload: { all: users, pages },
      });
    } catch (error) {
      setLoading("users", false);
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    setDefaults()
    setLoading("users", true);
    try {
      await client.delete(`users/${id}`);
      setLoading("users", false);
      startError("users", {
        msg: "Successfully deleted user",
        state: "success",
        status: true,
      });
      getUsers(1,10)
    } catch (error) {
      setLoading("users", false);
      if (error.response.data) {
        startError("users", {
          msg: error.response.data.msg,
          state: "",
          status: true,
        });
      }
      console.log(error)
    }
  }
//stats
  const getTableStats = async (type="events", time="day") => {
    try {
      let date = [{ "2": "Mon" }, { "3": "Tue" }, {"4": "Wed"}, {"5": "Thu"}, {"6": "Fri"}, {"7": "Sat"}, {"1":"Sun"}]
      const { data } = await client.get(`stats/all/${type}?time=${time}`);
      let table = state.table[type]
      if (time === "day") {
        table.category = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      table.series = [0, 0, 0, 0, 0, 0, 0]
      }
      if (time === "week") {
        table.category = ["week 1", "week 2", "week 3", "week 4"];
        table.series = [0, 0, 0, 0]
        date = [{"0":"week 1"},{"1":"week 2"},{"2":"week 3"},{"3":"week 4"}]
      }
      if (time === "month") {
        table.category = ["Jan", "Feb", "Mar", "Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
        table.series = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        date = [
          {1:"Jan"},
          { 2: "Feb" },
          { 3: "Mar" },
          { 4: "Apr" }, { 5: "May" }, { 6: "Jun" }, { 7: "Jul" }, { 8: "Aug" },
          { 9: "Sep" }, { 10: "Oct" }, { 11: "Nov" }, { 12: "Dec" }
        ];
      }
      data[type].forEach((elem) => {
        let count = elem.count || 0
        let currentTime = elem._id[time] || 0
          for (let i in date) {
            let d = date[i][currentTime];
            if (d) {
              let j = table.category.indexOf(d);
              table.series[j] = count;
              break;
            }
          }
      })
      dispatch({
        type: actions[`GET_TABLE_${type.toUpperCase()}`],
        payload:{[type]:table}
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
        setLoading,
        deleteUser,
        startError,
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