import { actions } from "./appActions";
export const reducer = (state, action) => {
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
    case actions.GET_REPORTS:
      const { reports, p } = action.payload;
      return {
        ...state,
        reports: {
          pages: p.pages,
          currentPage: p.currentPage,
          data: reports,
          loading: false,
        },
      };
    case actions.GET_PAYMENTS:
      const { payments, pa } = action.payload;
      return {
        ...state,
        payments: {
          pages: pa.pages,
          currentPage: pa.currentPage,
          data: payments,
          loading: false,
        },
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
    case actions.START_UPDATE:
      const { start, current, typeC } = action.payload;
      return {
        ...state,
        [`${typeC}_startUpdate`]: {
          ...state[`${typeC}_startUpdate`],
          start,
          current,
        },
      };
    case actions.FORM_ERROR:{
      const { err} = action.payload;
      return { ...state, user_form: err };
    }
    case actions.UPDATE_USER:
      const { userData } = action.payload;
      return { ...state, user: userData };
    case actions.LOGOUT:
      const { userD } = action.payload;
      return { ...state, user: userD };
    case actions.ERROR_DEFAULT:
      let error = { msg: "", state: "", show: false };
      return {
        ...state,
        user_form: error,
        GlobalError:{msg:"",show:false,type:"warning"}
      };
    case actions.SET_ERROR:
      const { typeData, err } = action.payload;
      return { ...state, [`${typeData}_error`]: err };
    case actions.START_UPDATE_ERR:
      const { t, newErr } = action.payload;
      return {
        ...state,
        [`${t}_startUpdate`]: { ...state[`${t}_startUpdate`], err: newErr },
      };
    case actions.SET_REPORT_ON:{
      const { event } = action.payload;
      return { ...state, report_on: { event } };
    }
    case actions.SET_PAY_ON:{
      const { type,data } = action.payload;
      return { ...state, payment_on: { ...state.payment_on,[type]:data} };
    }
    case actions.DEFAULT_DASHBOARD:
      const defaultData = { data: [], pages: 1, currentPage: 1, loading: true };
      return {
        ...state,
        users: defaultData,
        events: defaultData,
        reports: defaultData,
        payments: defaultData,
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

    case actions.DEFAULT_DASHBOARD_SINGLE:{
      const {typeData} = action.payload
      const defaultData = { data: [], pages: 1, currentPage: 1, loading: true };
      return {...state,[typeData]:defaultData}
    }
    case actions.SET_EVENT_CATEGORY:{
      const {categories} = action.payload
      return {...state,event_category:{data:categories,loading:false}}
    }
    case actions.SET_EVENT_CATEGORY_DEFAULT:{
      return {...state,event_category:{data:[],loading:true}}
    }
    case actions.SET_GLOBAL_ERR:{
      const {err} = action.payload
      return {...state, GlobalError:err}
    }
    case actions.CLOSE_GLOBAL_ERR:{
      const err = {msg:"",show:false,type:"warning"}
      return {...state, GlobalError:err}
    }
    case actions.SET_POSTERS:{
      const {posters} = action.payload
      return {...state, posters:{data:posters,loading:false},}
    }
    case actions.SET_POSTERS_LOAD:{
      return {...state, posters:{...state.posters,loading:true},}
    }
    default:
      return state;
  }
};
