import Cookie from "universal-cookie"

const cookie = new Cookie()
const opts ={
    path:"/",
    expires:new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
}
export const setCookie = (key,value)=>cookie.set(key,value,opts)

export const getCookie = (key) => cookie.get(key)

export const removeCookie = (key) => cookie.remove(key)