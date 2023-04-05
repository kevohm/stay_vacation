import { getCookie } from "../../../context/utils"
import moment from "moment"

export const initialState = {
    events:{ data: [], pages: 1, currentPage: 1, loading: true },
    recent :{ data: [], pages: 1, currentPage: 1, loading: true },
    related:{ data: [], loading: true },
    filter:{
        search: getCookie("search") || "",
        category: "",
        price: { min: getCookie("min") || 0, max: getCookie("max") || 300000 },
        validity:getCookie("validity") || moment(new Date).format("YYYY-MM-DD"),
        data:[],
        loading:false
      },
    sortBy:{sort:"createdAt",arrange:"desc",data:["createdAt desc","createdAt asc","name asc", "name desc"]},
    currentEvent:{data:{},id:getCookie("current") || null, loading:true},
    MemberError:{msg:"",show:false,type:"warning"},
    current_categories:getCookie("categories") || null,
    book_event:{data:null,loading:true},
    stages:{level: getCookie("stage") || 1,user:getCookie("user") || null,err:{state:"",msg:"",show:false}, price: getCookie("price") || null}
}

export const actions = {
    GET_EVENTS:"GET_EVENTS",
    GET_RECENT:"GET_RECENT",
    GET_RELATED:"GET_RELATED",
    SET_LOAD:"SET_LOAD",
    SET_FILTER:"SET_FILTER",
    SET_SORT:"SET_SORT",
    SET_CURRENT:"SET_CURRENT",
    SET_CURRENT_LOADING:"SET_CURRENT_LOADING",
    SET_LOCAL_FILTER:"SET_LOCAL_FILTER",
    SET_RECENT_LOADING:"SET_RECENT_LOADING",
    SET_CURRENT_CATEGORIES:"SET_CURRENT_CATEGORIES",
    SET_BOOK_EVENT:"SET_BOOK_EVENT",
    SET_BOOKING_STAGE:"SET_BOOKING_STAGE",
    SET_BOOKING_FORM_ERR:"SET_BOOKING_FORM_ERR",
    SET_BOOKING_DATA:"SET_BOOKING_DATA",
    SET_MEMBER_ERROR:"SET_MEMBER_ERROR"
}