
import {actions} from "./appActions"
export const reducer = (state, action)=>{
    switch (action.type) {
      case actions.GET_STATS:
        const { stats } = action.payload;
        return { ...state, stats };
      case actions.GET_TABLE_EVENTS:
        const { events } = action.payload;
        return { ...state, table: { ...state.table, events } };
      case actions.GET_TABLE_USERS:
        const { users } = action.payload;
        return { ...state, table: { ...state.table, users } };
      case actions.GET_USERS:
        const { all, pages } = action.payload;
        const { currentPage } = pages;
        return {
          ...state,
          users: { pages: pages.pages, currentPage, data: all, loading: false },
        };
      case actions.GET_EVENTS:
        const { allData, page } = action.payload;
        return {
          ...state,
          events: {
            pages: page.pages,
            currentPage: page.currentPage,
            data: allData,
            loading: false,
          },
        };
      case actions.SET_LOAD:
        const { type, load } = action.payload;
        return {
          ...state,
          [type]: {
            ...state[type],
            loading: load,
          },
        };
      case actions.REGISTER:
        return { ...state };
      case actions.UPDATE_USER:
        const { userData } = action.payload;
        return { ...state, user: userData };
      case actions.LOGOUT:
        const { userD } = action.payload;
        return { ...state, user: userD };
      case actions.ERROR_DEFAULT:
        const errorState = { msg: "", state: "", status: false }; 
        return { ...state, users_error: errorState, events_error: errorState };
      case actions.SET_ERROR:
        const { typeData, err } = action.payload;
        return { ...state, [`${typeData}_error`]: err };
      default:
        return state;
    }
}