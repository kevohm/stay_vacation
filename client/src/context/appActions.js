export const initialState = {
  stats: {
    users: 0,
    bookings: 0,
    successful: 0,
    failed: 0,
  },
  table: {
    users: {
      category: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [0, 0, 0, 0, 0, 0, 0],
    },
    events: {
      category: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [0, 0, 0, 0, 0, 0, 0],
    },
  },
  users: { data: [], pages: 1, currentPage: 1, loading: true },
  events: { data: [], pages: 1, currentPage: 1, loading: true },
  users_error: { msg: "", state: "", status: false },
  events_error: { msg: "", state: "", status: false },
  user_form: { msg: "", state: "", show: false },
  user: JSON.parse(localStorage.getItem("user")) || { role: null, id: null },
  user_startUpdate:{start:false,current:{email:"",phone_number:"", username:""}, err:{ msg: "", state: "", show: false }}
};
export const actions = {
  GET_STATS: "GET_STATS",
  GET_TABLE_USERS: "GET_TABLE_USERS",
  GET_TABLE_EVENTS: "GET_TABLE_EVENTS",
  GET_USERS: "GET_USERS",
  GET_EVENTS: "GET_EVENTS",
  REGISTER: "REGISTER",
  UPDATE_USER: "UPDATE_USER",
  LOGOUT: "LOGOUT",
  SET_LOAD: "SET_LOAD",
  ERROR_DEFAULT: "ERROR_DEFAULT",
  SET_ERROR: "SET_ERROR",
  FORM_ERROR: "FORM_ERROR",
  START_UPDATE: "START_UPDATE",
  START_UPDATE_ERR: "START_UPDATE_ERR",
};

export const env = {ADMIN:"96e0c255-1643-48d2-9c60-08a115fbda91",MEMBER:"e213ee27-cb78-4b61-bd8c-296546738f08"}
