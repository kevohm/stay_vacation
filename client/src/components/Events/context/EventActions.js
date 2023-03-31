export const initialState = {
    events:{ data: [], pages: 1, currentPage: 1, loading: true },
    recent :{ data: [], pages: 1, currentPage: 1, loading: true },
    filter:{
        search: "",
        category: "",
        price: { min: 0, max: 300000 },
        data:[],
        loading:false
      },
    sortBy:{sort:"createdAt",arrange:"desc",data:["createdAt desc","createdAt asc","name asc", "name desc"]},
    currentEvent:{data:{},id:localStorage.getItem("current") || null, loading:true},
    MemberError:{msg:"",show:false,type:"warning"}
}

export const actions = {
    GET_EVENTS:"GET_EVENTS",
    GET_RECENT:"GET_RECENT",
    SET_LOAD:"SET_LOAD",
    SET_FILTER:"SET_FILTER",
    SET_SORT:"SET_SORT",
    SET_CURRENT:"SET_CURRENT",
    SET_CURRENT_LOADING:"SET_CURRENT_LOADING"
}