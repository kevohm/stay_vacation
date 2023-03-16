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
  reports: { data: [], pages: 1, currentPage: 1, loading: true },
  payments: { data: [], pages: 1, currentPage: 1, loading: true },
  users_error: { msg: "", state: "", status: false },
  events_error: { msg: "", state: "", status: false },
  reports_error: { msg: "", state: "", status: false },
  payments_error: { msg: "", state: "", status: false },
  user_form: { msg: "", state: "", show: false },
  event_form: { msg: "", state: "", show: false },
  report_form: { msg: "", state: "", show: false },
  payment_form: { msg: "", state: "", show: false },
  user: JSON.parse(localStorage.getItem("user")) || { role: null, id: null },
  report_on:{
    event:{},
  },
  payment_on:{
    event:{},
    user:{}
  },
  user_startUpdate:{start:false,current:{email:"",phone_number:"", username:""}, err:{ msg: "", state: "", show: false }},
  event_startUpdate:{start:false,current:{
    "image": [],
    "name": "",
    "description": "",
    "city": "",
    "country": "",
    "category": [],
    "price_choices":[],
    "validity": "",
  }, err:{ msg: "", state: "", show: false }},
  report_startUpdate:{start:false,current:{
    "description": "",
    "state": ""
  }, err:{ msg: "", state: "", show: false }},
  payment_startUpdate:{start:false,current:{
    "description": "",
    "state": ""
  }, err:{ msg: "", state: "", show: false }}
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
  SET_REPORT_ON:"SET_REPORT_ON",
  GET_REPORTS:"GET_REPORTS",
  GET_PAYMENTS:"GET_PAYMENTS",
  DEFAULT_DASHBOARD:"DEFAULT_DASHBOARD",
  DEFAULT_DASHBOARD_SINGLE:"DEFAULT_DASHBOARD_SINGLE",
  SET_PAY_ON:"SET_PAY_ON"
};

export const env = {ADMIN:"96e0c255-1643-48d2-9c60-08a115fbda91",MEMBER:"e213ee27-cb78-4b61-bd8c-296546738f08"}
