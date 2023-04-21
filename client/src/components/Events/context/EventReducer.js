import { actions } from "./EventActions"
import { getCookie, setCookie } from "../../../context/utils"

export const reducer = (state,action)=>{
    switch (action.type) {
        case actions.GET_EVENTS:{
            const {data, pages, currentPage} = action.payload
            return {...state, events:{...state.events ,data, pages, currentPage, loading:false}}
        }
        case actions.GET_RECENT:{
            const {data, pages, currentPage} = action.payload
            return {...state, recent:{...state.events ,data, pages, currentPage, loading:false}}
        }
        case actions.GET_RELATED:{
            const {data} = action.payload
            return {...state, related:{data, loading:false}}
        }
        case actions.GET_CATEGORIES:{
            const {data} = action.payload
            return {...state, categories:{data, loading:false}}
        }
        case actions.SET_BOOK_EVENT:{
            const {data} = action.payload
            return {...state, book_event:{data,loading:false}}
        }
        case actions.SET_RECENT_LOADING:{
            const {status} = action.payload
            return {...state, related:{...state.related, loading:status}}
        }
        case actions.SET_BOOKING_STAGE:{
            const {level} = action.payload
            return {...state, stages:{...state.stages,level}}
        }
        case actions.SET_BOOKING_FORM_ERR:{
            const {err} = action.payload
            return {...state, stages:{...state.stages,err}}
        }
        case actions.SET_BOOKING_DATA:{
            const {type,data} = action.payload
            return {...state, stages:{...state.stages,[type]:data}}
        }
        case actions.SET_CURRENT_CATEGORIES:{
            const {categories} = action.payload
            return {...state,  current_categories:categories}
        }
        case actions.SET_LOAD:{
            const {status,type} = action.payload
            return {...state, [type]:{...state[type],loading:status}}
        }
        case actions.SET_FILTER:{
            const {data} = action.payload
            return {...state, filter:data}
        }
        case actions.SET_SORT:{
            const {sort,arrange} = action.payload
            return {...state, sortBy:{...state.sortBy, sort,arrange}}
        }
        case actions.SET_CURRENT:{
            const {data,id,isExpired} = action.payload
            return {...state, currentEvent:{data,id,loading:false,isExpired}}
        }
        case actions.SET_CURRENT_LOADING:{
            const {status} = action.payload
            return {...state, currentEvent:{...state.currentEvent,loading:status}}
        }
        case actions.SET_LOCAL_FILTER:{
            const search = getCookie("search")
            const min = getCookie("min")
            const max = getCookie("max")
            const validity = getCookie("validity")
            return {...state, filter:{
                search:  search || "",
                category: "",
                price: { min: min || 0, max: max || 300000 },
                validity:validity || "",
                data:[],
                loading:false
            }}
        }
        case actions.SET_MEMBER_ERROR:{
            const {err} = action.payload
            return {...state, MemberError:err}
        }
        case actions.SET_BOOK_ID:{
            const {id} = action.payload
            return {...state, book_event_id:id}
        }
        default:
            return state
    }
}