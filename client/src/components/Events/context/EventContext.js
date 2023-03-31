import React, { useContext, useReducer } from "react";
import { actions, initialState } from "./EventActions";
import { reducer } from "./EventReducer";
import { client } from "../../../context/AppContext";

const AppProvider = React.createContext();

const EventContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = (status, type) => {
    dispatch({
      type: actions.SET_LOAD,
      payload: { status, type },
    });
  };
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
    localStorage.setItem("current", data._id);
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
    search = ""
  ) => {
    setLoading(true, "events");

    const url = `/event/all?page=${page}&limit=${limit}&sort=${sort}&arrange=${arrange}&price_start=${min}&price_end=${max}&category=${category}&search=${search}`;
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
        getCategories
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
