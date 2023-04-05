import axios from "axios";
import React, {useContext, createContext} from "react"
import { useEffect } from "react";
import { useReducer } from "react";
import { actions, initialState } from "./appActions";
import { reducer } from "./appReducer"
import {setCookie} from "./utils"
const appContext = createContext();
const client = axios.create({
  baseURL: "http://localhost:5000/v1",
  withCredentials: true,
});

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
//--------------------------AUTHENTICATION----------------------------------------------------------------------
  client.interceptors.response.use(
    (response)=>response,
    function (error) {
      if (error?.response && error?.response?.status === 401) {
        logout()
      }
      if(error?.response?.status === 500 && error?.response?.data?.msg === "Check your Internet connection"){
        updateError({
          msg:"Check your internet connection",
          show:true,
          type:"warning"
        })
      }
      return Promise.reject(error);
    }
  );
  const getUser = async () => {
    try {
      const { data } = await client.get(`users/user`);
      const {id, role} = data.user
      setCookie("_v",JSON.stringify({ id, role }))
      dispatch({ type: actions.UPDATE_USER, payload: { userData: { id, role } } })
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
  
  const handleUser = (body, type) => {
    const createdAt = new Date().toISOString();
    const login = type === "login"
    let url = (login) ? "auth/login":"auth"
    return (!login)?client.post(url, { ...body, createdAt }):client.post(url, body)
      
  } 
//--------------------------EVENTS----------------------------------------------------------------------
  const getEvents = async (page=1, limit=5,sort="created at",arrange="desc", validity="", validation) => {
    const dir = (validation)? "lessthan": "greaterthan"
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
      const { data } = await client.get(`event/all?page=${page}&limit=${limit}&sort=${mapSort[sort]}&arrange=${arrange}&validity=${validity}&dir=${dir}`);
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
  const addEvent = async (body, page=1)=>{
    const {image,max_people,name,description,city,country,
      category,price_choices,validity,Amenities} = body
    const newDate = new Date(new Date(validity).setHours(23,59,59,900)).toISOString()
    const createdAt = new Date().toISOString()
    try {
      const { data } = await client.post(`event/create`, {image,max_people,name,description,city,country,
        category,price_choices,Amenities,validity:newDate,createdAt});
        updateError({
          msg: "Successfully created Event",
          type: "success",
          show: true,
        });
        getEvents(page,10)
    } catch (error) {
      setOtherErrors(error)
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
      "Amenities":[],
      "category": [],
      "price_choices":[],
      "validity": "",
    }
    const date = new Date().toISOString()
    try {
      await client.patch(`event/${id}`, {...body, updatedAt:date })
      updateError({
        msg: "Event has been updated",
        type: "success",
        show: true,
      });
      getEvents(state.events.currentPage,10)
      setTimeout(()=>toggleUpdate("event", defaultData), 3000)
    } catch (error){
      setOtherErrors(error)
      setTimeout(
        () =>
        toggleUpdate("event", defaultData),
        3000
      );
    }
  }
  const removeEvent = async(id)=>{
    setDefaults()
    setLoading("events", true);
    try {
      await client.delete(`event/${id}`);
      setLoading("events", false);
      getEvents(state.events.currentPage,10)
      updateError(
        {
          msg: "Event deleted",
          type: "success",
          show: true,
        }
      )
    } catch (error) {
      setLoading("events", false);
      setOtherErrors(error)
    }
  }
//--------------------------CATEGORIES---------------------------------------------------------------------
const getCategories = ()=>{
  dispatch({type:actions.SET_EVENT_CATEGORY_DEFAULT})
  return client.get("categories")}
const getAllCategories = async ()=>{
  dispatch({type:actions.SET_EVENT_CATEGORY_DEFAULT})
  try {
    const {data} = await client.get("categories")
    const {categories} = data
    dispatch({
      type:"SET_EVENT_CATEGORY",
      payload:{categories}
    })
  } catch (error) {
    setOtherErrors(error)
  }
}
const addCategory = async (body)=>{
  const {name} = body
  const createdAt = new Date().toISOString()
  try {
    await client.post("categories",{name,createdAt})
    updateError(
      {
        msg: "Category successfully added",
        type: "success",
        show: true,
      }
    )
    getAllCategories()
  } catch (error) {
    setOtherErrors(error)
  }
}
const updateCategory = async (id, name)=>{
  const updatedAt = new Date().toISOString()
  try {
    await client.patch(`categories/${id}`, {name, updatedAt})
    updateError(
      {
        msg: "Category successfully updated",
        type: "success",
        show: true,
      }
    )
    getAllCategories()
    getEvents(1,10)
  } catch (error) {
    setOtherErrors(error)
  }
}
//--------------------------UTILS----------------------------------------------------------------------
const closeGlobalErr = ()=>{
  dispatch({type:actions.CLOSE_GLOBAL_ERR})
}
const setOtherErrors = (error)=>{
  if(error.response && error.response.data){
    updateError({msg:error.response.data.msg,show:true,type:"warning"})
  }
}
const setGlobalErrors = (err)=>{
  dispatch({
    type:actions.SET_GLOBAL_ERR,
    payload:{err}
  })
}  
const updateError = (newErr) => {
  setGlobalErrors(newErr)
}
const setLoading = (type, status) => {
    dispatch({ type: actions.SET_LOAD, payload: { type, load: status } })
  }
  const setDefaults = () => {
    return setTimeout(() => dispatch(
    {type:actions.ERROR_DEFAULT}
    ), 3000)
  } 
  // changed errors
  const setForm = (err) => {
     dispatch({
       type: actions.FORM_ERROR,
       payload: { err },
     });
    setDefaults();
  }
  const toggleUpdate = (type, current) => {
    dispatch({
      type: actions.START_UPDATE,
      payload: { start: !state[`${type}_startUpdate`].start, current, typeC:type },
    });
  };
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
//--------------------------USERS----------------------------------------------------------------------
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
    }
  };
  const addUser = async(body)=>{
    const createdAt = new Date().toISOString();
    try {
      await client.post("auth", { ...body, createdAt });
      getUsers(state.users.currentPage, 10)
        updateError({
          msg: "successfully added user",
          type: "success",
          show: true,
        });
    } catch (error) {
      setOtherErrors(error)
    }
}
  const deleteUser = async (id) => {
    try {
      await client.delete(`users/${id}`);
      getUsers(state.users.currentPage,10)
      updateError({
        msg: "User deleted.",
        type: "success",
        show: true,
      })
    } catch (error) {
      setOtherErrors(error)
    }
  }
  const updateUser = async (id, body) => {
    const date = new Date().toISOString()
    try {
      await client.patch(`users/${id}`, {...body, updatedAt:date })
      getUsers(state.users.currentPage,10)
      updateError({
        msg: "User updated.",
        type: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("user", { email: "", phone_number: "", username: "" }), 3000)
    } catch (error) {
      setOtherErrors(error)
        setTimeout(
          () =>
            toggleUpdate("user", { email: "", phone_number: "", username: "" }),
          3000
        );
    }
  }
  //--------------------------REPORTS----------------------------------------------------------------------
  const setCurrentEvent = (event)=>{
    dispatch({
      type:actions.SET_REPORT_ON,
      payload:{event}
    })
  }
  const createReport = async (id, body)=>{
    try {
      await client.post(`reports/${id}`, body)
      getReports(1,10)
    updateError({
        msg: "Successfully created Report",
        type: "success",
        show: true,
      });
    } catch (error) {
      setOtherErrors(error)
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
      getReports(1,10)
      updateError({
        msg: "Report updated",
        type: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("report", {
        "description": "",
        "state": "",
        "event":{}
      }), 3000)
    } catch (error) {
      setOtherErrors(error)
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
  }
  const deleteReport = async (id) => {
    try {
      await client.delete(`reports/${id}`);
      getReports(1,10)
      updateError({
        msg: "Report deleted",
        type: "success",
        show: true,
      })
    } catch (error) {
      setOtherErrors(error)
    }
  }
//--------------------------PAYMENTS----------------------------------------------------------------------
const setCurrents = (type,data)=>{
  dispatch({
    type:actions.SET_PAY_ON,
    payload:{ type,data }
  })
}
const createPayment = async (id, userId,category,currency)=>{
  let url = `payments/pay/${id}/${userId}`
  if(category && currency){
    url= `payments/pay/${id}/${userId}?data=${category}&currency=${currency}`
  }
  if(currency){
    url= `payments/pay/${id}/${userId}?currency=${currency}`
  }
  if(category){
    url= `payments/pay/${id}/${userId}?data=${category}`
  }
  try {
    await client.post(url)
    getPayments(state.payments.currentPage,10)
    updateError({
      msg: "Successfully made Payment",
      type: "success",
      show: true,
    });
  } catch (error) {
    setOtherErrors(error)
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
    }
  };
  const updatePayment = async (id, body) => {
    const date = new Date().toISOString()
    try {
      await client.patch(`payments/${id}`, {...body, updatedAt:date })
      getPayments(state.payments.currentPage,10)
      updateError({
        msg: "Payment updated.",
        type: "success",
        show: true,
      });
      setTimeout(()=>toggleUpdate("payment", {
        "state": "",
      }), 3000)
    } catch (error) {
      setOtherErrors(error)
        setTimeout(
          () =>
            toggleUpdate("payment", {
              "state": "",
            }),
          3000
        );
    }
  }
  const deletePayment = async (id) => {
    try {
      await client.delete(`payments/${id}`);
      getPayments(state.payments.currentPage,10)
      updateError({
        msg: "Payment deleted.",
        type: "success",
        show: true,
      })
    } catch (error) {
      setOtherErrors(error)
    }
  }
//--------------------------STATS----------------------------------------------------------------------
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
        dispatch,
        getStats,
        getTableStats,
        getUsers,
        getEvents,
        handleUser,
        logout,
        getUser,
        addUser,
        setLoading,
        deleteUser,
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
        updatePayment,
        getCategories,
        addCategory,
        updateCategory,
        updateError,
        closeGlobalErr
      }}
    >
      {children}
    </appContext.Provider>
  );
}
const useGlobal = () => {
    return useContext(appContext)
}

export { AppContext , useGlobal, client}