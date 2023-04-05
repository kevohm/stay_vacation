import React, { useContext, useReducer } from "react";
import { actions, initialState } from "./EventActions";
import { reducer } from "./EventReducer";
import { client, useGlobal } from "../../../context/AppContext";
import { removeCookie, setCookie } from "../../../context/utils";

const AppProvider = React.createContext();

const EventContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGlobalResponse = (error)=>{
    if(error.response && error.response.data){
      dispatch({
        type: actions.SET_MEMBER_ERROR,
        payload: {
          err:{msg:error.response.data.msg,show:true,type:"warning"}
        },
      });
    }
  }

  const setGlobalErrors = (err)=>{
    dispatch({
      type: actions.SET_MEMBER_ERROR,
      payload: { err},
    });
  }
  const setDefaultGlobal = ()=>{
    const err = {msg:"",show:false,type:"warning"}
    dispatch({
      type: actions.SET_MEMBER_ERROR,
      payload: { err},
    });
  }
  const setLoading = (status, type) => {
    dispatch({
      type: actions.SET_LOAD,
      payload: { status, type },
    });
  };
  const setFilterLocal = (search,validity,min,max)=>{
    setCookie("search",search)
    setCookie("min",min)
    setCookie("max",max)
    setCookie("validity",validity)
  }
  const removeFilterLocal = ()=>{
    removeCookie("search")
    removeCookie("min")
    removeCookie("max")
    removeCookie("validity")
  }
  const setFilterFromLocal = ()=>{
    dispatch({
      type:actions.SET_LOCAL_FILTER
    })
  }
  const setFilter = (data) => {
    dispatch({
      type: actions.SET_FILTER,
      payload: { data },
    });
  };
  const setSort = (sort, arrange) => {
    dispatch({
      type: actions.SET_SORT,
      payload: { sort, arrange },
    });
  };
  const setCurrentEvent = (data) => {
    setCookie("current", data._id);
    dispatch({
      type: actions.SET_CURRENT,
      payload: { data, id: data._id },
    });
  };
  const setCurrentLoading = (status)=>{
    dispatch({
        type: actions.SET_CURRENT_LOADING,
        payload: { status },
      });
  }
  const setRecentLoading = (status)=>{
    dispatch({
        type: actions.SET_RECENT_LOADING,
        payload: { status },
      });
  }
  const getRelated = async (name)=>{
    setRecentLoading(true)
    try {
      const categoriesData = await client.get(`event/all?name=${name}`);
      const categories=categoriesData.data.events[0].category.map((i)=>i._id)
      console.log(categories)
      const {data} = await client.get(`event/all?categories=${categories}`,{categories})
      const {events} = data
      dispatch({type:actions.GET_RELATED,payload:{data:events}})
    } catch (error) {
      dispatch({type:actions.GET_RELATED,payload:{data:[]}})
    }
  }
  const getSingleById = async (id) => {
    try {
      const { data } = await client.get(`event/${id}`);
      const {event} = data
      if( !state.book_event.data || event._id !== state.book_event.data._id){
        removeBookingState()
      }
      dispatch({
        type:actions.SET_BOOK_EVENT,
        payload:{data:event}
      })
    } catch (error) {
      removeBookingState()
      dispatch({
        type:actions.SET_BOOK_EVENT,
        payload:{data:null}
      })
    }
  };
  const getSingle = async (id) => {
    setCurrentLoading(true)
    try {
      const { data } = await client.get(`event/all?name=${id}`);
      const {events} = data
      if(events.length === 0){
        setCurrentEvent({_id:""})
      }else{
        setCurrentEvent(events[0])
      }
      setCurrentLoading(false)
    } catch (error) {
      console.log(error);
      setCurrentEvent({_id:""})
      setCurrentLoading(false)
    }
  };
  const getAll = async (
    page = 1,
    limit = 5,
    sort = "createdAt",
    arrange = "desc",
    min = 0,
    max = 900000,
    category = "",
    search = "",
    validity="",
    dir=""
  ) => {
    setLoading(true, "events");

    const url = `/event/all?page=${page}&limit=${limit}&sort=${sort}&arrange=${arrange}&price_start=${min}&price_end=${max}&category=${category}&search=${search}&validity=${validity}&dir=${dir}`;
    try {
      const { data } = await client.get(url);
      const { events, pages } = data;
      dispatch({
        type: actions.GET_EVENTS,
        payload: {
          data: events,
          pages: pages.pages,
          currentPage: pages.currentPage,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getRecent = async (
    page = 1,
    limit = 5,
    sort = "createdAt",
    arrange = "desc",
    min = 0,
    max = 900000,
    category = ""
  ) => {
    const url = `/event/all?page=${page}&limit=${limit}&sort=${sort}&arrange=${arrange}&price_start=${min}&price_end=${max}&category=${category}`;
    try {
      const { data } = await client.get(url);
      const { events, pages } = data;
      dispatch({
        type: actions.GET_RECENT,
        payload: {
          data: events,
          pages: pages.pages,
          currentPage: pages.currentPage,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async()=>{
    setFilter({...state.filter, loading:true})
    try {
      const { data } = await client.get("categories");
      const { categories } = data;
      setFilter({...state.filter, data:categories, loading:false})
    } catch (error) {
      setFilter({...state.filter, loading:false})
    }
  }
  //-----BOOKINg------------------------------------------------
  const setBookingStage = (level)=>{
    dispatch({
      type:actions.SET_BOOKING_STAGE,
      payload:{level}
    })
  }
  const setBookingError = (err)=>{
    const defaultErr = {msg:"",show:false,state:""}
    dispatch({
      type:actions.SET_BOOKING_FORM_ERR,
      payload:{err}
    })
    return setTimeout(()=>dispatch({
      type:actions.SET_BOOKING_FORM_ERR,
      payload:{err:defaultErr}
    }),3000)
  }
  const setBookingData = (user,price)=>{
    dispatch({
      type:actions.SET_BOOKING_DATA,
      payload:{user,price}
    })
  }
  const removeBookingState = ()=>{
    dispatch({
      type:actions.SET_BOOKING_STAGE,
      payload:{level:1}
    })
    dispatch({
      type:actions.SET_BOOKING_DATA,
      payload:{user:null,price:null}
    })
    removeCookie("user")
    removeCookie("price")
    removeCookie("stage")
  }
  const registerBoookingUser = async(body,price)=>{
    const createdAt = new Date().toISOString()
    const {email,password} = body
    try {
      await client.post("/auth", {...body, createdAt})
      await client.post("/auth/login", {email,password})
      const {data} = await client.get("/users/user")
      setBookingData(data.details,price)
      setBookingStage(2)
      setCookie("user",JSON.stringify(data.details))
      setCookie("price",JSON.stringify(price))
      setCookie("stage",2)
    } catch (error) {
      if(error.response && error.response.data){
        setBookingError({
          msg:error.response.data.msg,
          state:"",
          show:true
        })
      }
      console.log(error)
    }
  }
  const payNow = (eventId, userId)=>{
    const currentTime = new Date().toISOString()
    return client.post(`payments/pay/${eventId}/${userId}`,{currentTime})
  }
  return (
    <AppProvider.Provider
      value={{
        ...state,
        getAll,
        getRecent,
        setFilter,
        setSort,
        setCurrentEvent,
        getSingle,
        getCategories,
        setFilterLocal,
        removeFilterLocal,
        setFilterFromLocal,
        getRelated,
        getSingleById,
        registerBoookingUser,
        setBookingError,
        payNow,
        setDefaultGlobal,
        setGlobalErrors,
        setGlobalResponse
      }}
    >
      {children}
    </AppProvider.Provider>
  );
};
const useEvent = () => {
  return useContext(AppProvider);
};
export { EventContext, useEvent };