import moment from "moment";

export const minDate = moment(new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD")

export const currentDate = moment(new Date()).format("YYYY-MM-DD") 