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
    (response)=>response,
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
        setForm("user", {
          msg: "You are logged in. Redirecting...",
          state: "success",
          show: true,
        });
      } else {
        setForm("user", {
          msg: data.msg,
          state: "success",
          show: true,
        });
      }
      console.log(data)
    } catch (error) {
      if (error.response.data) {
        setForm("user", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
      }
      console.log(error);
    }
  } 
//events
  const getEvents = async (page=1, limit=5,sort="created at",arrange="desc", validity="") => {
    const mapSort = {
      name:"name",
      description:"descripton",
      validity:'validity',
      city:'city', 
      country:'country',
      "created at": "createdAt",
      "updated at": "updatedAt",
    };
    try {
      const { data } = await client.get(`event/all?page=${page}&limit=${limit}&sort=${mapSort[sort]}&arrange=${arrange}&validity=${validity}`);
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
  const addEvent = async (body)=>{
    const {image,max_people,name,description,city,country,
      category,price_choices,validity} = body
    const newDate = new Date(new Date(validity).setHours(23,59,59,900)).toISOString()
    const createdAt = new Date().toISOString()
    try {
      const { data } = await client.post(`event/create`, {image,max_people,name,description,city,country,
        category,price_choices,validity:newDate,createdAt});
        setForm("event", {
          msg: "Successfully created Event",
          state: "success",
          show: true,
        });
      console.log(data)
    } catch (error) {
      if (error.response.data) {
        setForm("event", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
      }
      console.log(error);
    }
  }
  const updateEvent = async (id, body) => {
    const defaultData = {
      "image": [],
      "max_people": "",
      "name": "",
      "description": "",
      "city": "",
      "country": "",
      "category": [],
      "price_choices":[],
      "validity": "",
    }
    const date = new Date().toISOString()
    try {
      await client.patch(`event/${id}`, {...body, updatedAt:date })
      updateError("event", {
        msg: "Event updated. Reload to see changes",
        state: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("event", defaultData), 3000)
    } catch (error) {
      if (error.response.data) {
        updateError("event", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
        setTimeout(
          () =>
            toggleUpdate("event", defaultData),
          3000
        );
      }
      
      console.log(error)
    }
  }
  const removeEvent = async(id)=>{
    setDefaults()
    setLoading("events", true);
    try {
      await client.delete(`event/${id}`);
      setLoading("events", false);
      setTimeout( ()=>startError("events", {
        msg: "Event deleted. Reload to see changes",
        state: "success",
        status: true,
      }),3000)
    } catch (error) {
      setLoading("events", false);
      if (error.response.data) {
        startError("events", {
          msg: error.response.data.msg,
          state: "",
          status: true,
        });
      }
      console.log(error)
    }
  }
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
  const setForm = (type, err) => {
     dispatch({
       type: actions.FORM_ERROR,
       payload: { currentErr: err, currentType: type },
     });
    setDefaults();
  }
  const toggleUpdate = (type, current) => {
    dispatch({
      type: actions.START_UPDATE,
      payload: { start: !state[`${type}_startUpdate`].start, current, typeC:type },
    });
  };
  const updateError = (type, newErr) => {
    dispatch({
      type: actions.START_UPDATE_ERR,
      payload: {
        newErr,
        t: type,
      },
    });
    setDefaults();
  }
  const defaultData = ()=>{
    dispatch({
      type:actions.DEFAULT_DASHBOARD
    })
  }
  const defaultSingleData = (type)=>{
    dispatch({
      type:actions.DEFAULT_DASHBOARD_SINGLE,
      payload:{typeData:type}
    })
  }
// users
  const getUsers = async (page = 1, limit = 5, sort = "created at", arrange = "desc") => {
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
      setTimeout( ()=>startError("users", {
        msg: "User deleted. Reload to see changes",
        state: "success",
        status: true,
      }),3000)
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
  const updateUser = async (id, body) => {
    const date = new Date().toISOString()
    try {
      await client.patch(`users/${id}`, {...body, updatedAt:date })
      updateError("user", {
        msg: "User updated. Reload to see changes",
        state: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("user", { email: "", phone_number: "", username: "" }), 3000)
    } catch (error) {
      if (error.response.data) {
        updateError("user", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
        setTimeout(
          () =>
            toggleUpdate("user", { email: "", phone_number: "", username: "" }),
          3000
        );
      }
      
      console.log(error)
    }
  }
  //reports
  const setCurrentEvent = (event)=>{
    dispatch({
      type:actions.SET_REPORT_ON,
      payload:{event}
    })
  }
  const createReport = async (id, body)=>{
    try {
      await client.post(`reports/${id}`, body)
      setForm("report", {
        msg: "Successfully created Report",
        state: "success",
        show: true,
      });
    } catch (error) {
      if(error.response.data){
        setForm("report", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
      }
      console.log(error)
      
    }
  }
  const getReports = async (page = 1, limit = 5, sort = "created at", arrange = "desc") => {
    const mapSort = {
      "created at": "createdAt",
      "updated at": "updatedAt",
    };
        
    try {
      const { data } = await client.get(
        `reports?page=${page}&limit=${limit}&sort=${mapSort[sort]}&arrange=${arrange}`
      );
      const { reports, pages } = data;
      dispatch({
        type: actions.GET_REPORTS,
        payload: { reports, p:pages },
      });
    } catch (error) {
      setLoading("reports", false);
      console.log(error);
    }
  };
  const updateReport = async (id, body) => {
    const date = new Date().toISOString()
    try {
      await client.patch(`reports/${id}`, {...body, updatedAt:date })
      updateError("report", {
        msg: "Report updated. Reload to see changes",
        state: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("report", {
        "description": "",
        "state": "",
        "event":{}
      }), 3000)
    } catch (error) {
      if (error.response.data) {
        updateError("report", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
        setTimeout(
          () =>
            toggleUpdate("report", {
              "description": "",
              "state": "",
              "event":{}
            }),
          3000
        );
      }
      
      console.log(error)
    }
  }
  const deleteReport = async (id) => {
    setDefaults()
    setLoading("reports", true);
    try {
      await client.delete(`reports/${id}`);
      setLoading("reports", false);
      setTimeout( ()=>startError("reports", {
        msg: "Report deleted. Reload to see changes",
        state: "success",
        status: true,
      }),3000)
    } catch (error) {
      setLoading("reports", false);
      if (error.response.data) {
        startError("reports", {
          msg: error.response.data.msg,
          state: "",
          status: true,
        });
      }
      console.log(error)
    }
  }
//payments
const setCurrents = (type,data)=>{
  dispatch({
    type:actions.SET_PAY_ON,
    payload:{ type,data }
  })
}
const createPayment = async (id, userId,body)=>{
  try {
    await client.post(`payments/pay/${id}/${userId}`, body)
    setForm("payment", {
      msg: "Successfully made Payment",
      state: "success",
      show: true,
    });
  } catch (error) {
    if(error.response.data){
      setForm("payment", {
        msg: error.response.data.msg,
        state: "",
        show: true,
      });
    }
    console.log(error)
    
  }
}
  const getPayments = async (page = 1, limit = 5, sort = "created at", arrange = "desc") => {
    const mapSort = {
      "created at": "createdAt",
      "updated at": "updatedAt",
    };
    try {
      const { data } = await client.get(
        `payments?page=${page}&limit=${limit}&sort=${mapSort[sort]}&arrange=${arrange}`
      );
      const { payments, pages } = data;
      dispatch({
        type: actions.GET_PAYMENTS,
        payload: { payments, pa:pages },
      });
    } catch (error) {
      setLoading("payments", false);
      console.log(error);
    }
  };
  const updatePayment = async (id, body) => {
    const date = new Date().toISOString()
    try {
      await client.patch(`payments/${id}`, {...body, updatedAt:date })
      updateError("payment", {
        msg: "Payment updated. Reload to see changes",
        state: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("payment", {
        "state": "",
      }), 3000)
    } catch (error) {
      if (error.response.data) {
        updateError("payment", {
          msg: error.response.data.msg,
          state: "",
          show: true,
        });
        setTimeout(
          () =>
            toggleUpdate("payment", {
              "state": "",
            }),
          3000
        );
      }
      
      console.log(error)
    }
  }
  const deletePayment = async (id) => {
    setDefaults()
    setLoading("payments", true);
    try {
      await client.delete(`payments/${id}`);
      setLoading("payments", false);
      setTimeout( ()=>startError("payments", {
        msg: "Payment deleted. Reload to see changes",
        state: "success",
        status: true,
      }),3000)
    } catch (error) {
      setLoading("reports", false);
      if (error.response.data) {
        startError("payments", {
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
        setForm,
        toggleUpdate,
        updateError,
        updateUser,
        addEvent,
        removeEvent,
        updateEvent,
        setCurrentEvent,
        createReport,
        getReports,
        updateReport,
        deleteReport,
        getPayments,
        defaultData,
        defaultSingleData,
        setCurrents,
        createPayment,
        deletePayment,
        updatePayment
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