import { actions } from "./EventActions"
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
            const {data,id} = action.payload
            return {...state, currentEvent:{data,id,loading:false}}
        }
        case actions.SET_CURRENT_LOADING:{
            const {status} = action.payload
            return {...state, currentEvent:{...state.currentEvent,loading:status}}
        }
        default:
            return state
    }
}