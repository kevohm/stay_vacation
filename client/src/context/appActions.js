export const initialState = {
  stats: {
    users: 0,
    bookings: 0,
    successful: 0,
    failed: 0,
  },
  table: {
    users: [],
    events: []
  },
  users: [],
  events: [],
  user:{role:null, id:null}
}; 
export const actions = {
  GET_STATS: "GET_STATS",
  GET_TABLE_USERS: "GET_TABLE_USERS",
  GET_TABLE_EVENTS: "GET_TABLE_EVENTS",
  GET_USERS: "GET_USERS",
  GET_EVENTS: "GET_EVENTS",
  REGISTER: "REGISTER",
  UPDATE_USER: "UPDATE_USER",
};
