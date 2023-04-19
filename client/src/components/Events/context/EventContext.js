import React, { useContext, useReducer } from "react";
import { actions, initialState } from "./EventActions";
import { reducer } from "./EventReducer";
import {  client,useGlobal } from "../../../context/AppContext";
import { removeCookie, setCookie } from "../../../context/utils";
import moment from "moment";

const AppProvider = React.createContext();

const EventContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {setupUser} = useGlobal()
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
  const setFilterLocal = (search,validity,min,max,category,expired=false)=>{
    setCookie("search",search)
    setCookie("min",min)
    setCookie("max",max)
    setCookie("validity",validity)
    setCookie("category",category)
    setCookie("expired",expired)
  }
  const removeFilterLocal = ()=>{
    removeCookie("search")
    removeCookie("min")
    removeCookie("max")
    removeCookie("validity")
    removeCookie("category")
    setFilter({
      search: "",
      category: "",
      price: { min:0, max:300000 },
      validity:moment(new Date).format("YYYY-MM-DD")
    })
  }
  const setFilterFromLocal = ()=>{
    dispatch({
      type:actions.SET_LOCAL_FILTER
    })
  }
  const storeFilter = (city,date,min,max,category,expired)=>{
    const maximum = (max === 0)?'300000':max
        setFilter({
          search: city,
          category: category,
          price: { min, max:maximum},
          validity: date,
          expired
        })
        setFilterLocal(city,date,min,maximum,category,expired)
  }
  const setFilter = (data) => {
    setFilterLocal(data.search,data.validity,data.price.min,data.price.max,data.category,data.expired)
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
  const setCurrentEvent = (data, isExpired=false) => {
    setCookie("current", data._id);
    dispatch({
      type: actions.SET_CURRENT,
      payload: { data, id: data._id , isExpired},
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
      const eventId =categoriesData.data.events[0]._id
      const {data} = await client.get(`event/all?categories=${categories}&eventId=${eventId}`,{categories})
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
      if( state.book_event_id !== event._id && !state.stages){
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
      setCookie("book",events[0]._id)
      if(events.length === 0){
        setCurrentEvent({_id:""})
      }else{
        const isExpired = (new Date(events[0].validity) - new Date() - (24 * 60 * 60 * 1000)) < 0
        setCurrentEvent(events[0],isExpired)
      }
      setCurrentLoading(false)
    } catch (error) {
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
    validity="lte",
    date = new Date().toISOString()
  ) => {
    setLoading(true, "events");
    const expiry = new Date().toISOString()
    let url = `/event/all?page=${page}&limit=${limit}&sort=${sort}&arrange=${arrange}&price_start=${min}&price_end=${max}&category=${category}&search=${search}&validity=${validity}&date=${date}&expiry=${expiry}`;
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
  const getReaction = (id)=>client.get(`event/reaction/${id}`)
  const likeEvent= (id)=>client.post(`event/like/${id}`)
  const dislikeEvent = (id)=>client.post(`event/dislike/${id}`)
  const unlikeEvent= (id)=>client.delete(`event/unlike/${id}`)
  const undislikeEvent = (id)=>client.delete(`event/undislike/${id}`)
  const fetchEvent = (id)=>client.get(`event/${id}`)
  const getCategories = async()=>{
    try {
      const { data } = await client.get("categories");
      const { categories } = data;
      dispatch({
        type:actions.GET_CATEGORIES,
        payload:{data:categories}
      })
    } catch (error) {
      dispatch({
        type:actions.GET_CATEGORIES,
        payload:{data:[]}
      })
    }
  }
  //-----BOOKINg------------------------------------------------
  const setBookingStage = (level)=>{
    dispatch({
      type:actions.SET_BOOKING_STAGE,
      payload:{level}
    })
    setCookie("stage",2)
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
  const setBookingData = (type,data)=>{
    dispatch({
      type:actions.SET_BOOKING_DATA,
      payload:{type,data}
    })
    setCookie(type,JSON.stringify(data))
  }
  const removeBookingState = ()=>{
    dispatch({
      type:actions.SET_BOOKING_STAGE,
      payload:{level:1}
    })
    dispatch({
      type:actions.SET_BOOKING_DATA,
      payload:{type:"user",data:null}
    })
    dispatch({
      type:actions.SET_BOOKING_DATA,
      payload:{type:"price",data:null}
    })
    removeCookie("user")
    removeCookie("price")
    removeCookie("stage")
  }
  const registerBoookingUser = async(body)=>{
    const createdAt = new Date().toISOString()
    const {email,password} = body
    try {
      await client.post("/auth", {...body, createdAt})
      await client.post("/auth/login", {email,password})
      const {data} = await client.get("/users/user")
      setBookingData("user",data.details)
      setBookingStage(2)
      const {id,role} = data.user
      setupUser(id,role)
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
  const getBookingUser = ()=>{
    return client.get(`/users/user`)
  }
  const payNow = (eventId, userId,data)=>{
    const currentTime = new Date().toISOString()
    return client.post(`payments/pay/${eventId}/${userId}?data=${data}`,{currentTime})
  }
  const userPayments = (id)=>client.get(`payments?userId=${id}`)

  //-------------COMMENTS------------------
  const getComments = (id)=>client.get(`comments?event=${id}`)
  const addComment = (id,data)=>{
  const createdAt = new Date().toISOString()
    return client.post(`comments/${id}`,{...data,createdAt})}
  const deleteComment = (id)=>client.delete(`comments/${id}`)
  const updateComment = (id,data)=>{
    const updatedAt = new Date().toISOString()
      return client.patch(`comments/${id}`,{...data,updatedAt})}
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
        setGlobalResponse,
        getBookingUser,
        setBookingData,
        setBookingStage,
        userPayments,
        getComments,
        addComment,
        deleteComment,
        updateComment,
        storeFilter,
        getReaction,
        likeEvent,
        dislikeEvent,
        fetchEvent,
        undislikeEvent,
        unlikeEvent
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
