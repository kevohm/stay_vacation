
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
        const { all } = action.payload;
        return { ...state, users: all };
      case actions.GET_EVENTS:
        const { allData } = action.payload;
        return { ...state, events: allData };
      case actions.REGISTER:
        return { ...state };
      case actions.UPDATE_USER:
        const { userData } = action.payload;
        return { ...state, user: userData };
      default:
        return state;
    }
}