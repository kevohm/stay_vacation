import { getCookie } from "../../../context/utils"
import { minDate } from "./utils"

export const initialState = {
    events:{ data: [], pages: 1, currentPage: 1, loading: true },
    recent :{ data: [], pages: 1, currentPage: 1, loading: true },
    related:{ data: [], loading: true },
    filter:{
        search: getCookie("search") || "",
        category: getCookie("category") || "",
        price: { min: getCookie("min") || 0, max: getCookie("max") || 300000 },
        validity: getCookie("validity") || minDate,
        expired: getCookie("expired") === "true" || false
      },
    categories:{
        data:[],
        loading:true
    },
    sortBy:{sort:"createdAt",arrange:"desc",data:["newest","oldest","name"]},
    currentEvent:{data:{},id:getCookie("current") || null, loading:true,isExpired:false},
    MemberError:{msg:"",show:false,type:"warning"},
    current_categories:getCookie("categories") || null,
    book_event:{data:null,loading:true},
    book_event_id:getCookie("book") || null,
    stages:{level: getCookie("stage") || 1,user:getCookie("user") || null,err:{state:"",msg:"",show:false}, price: getCookie("price") || null},
}

export const actions = {
    GET_EVENTS:"GET_EVENTS",
    GET_RECENT:"GET_RECENT",
    GET_RELATED:"GET_RELATED",
    GET_CATEGORIES:"GET_CATEGORIES",
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
    SET_MEMBER_ERROR:"SET_MEMBER_ERROR",
    SET_BOOK_ID:"SET_BOOK_ID",

}