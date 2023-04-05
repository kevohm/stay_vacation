import valid from "validator"
export const verifyData = ({username,email,password,phone_number,price,confirmPassword, changeErr})=>{
    let err = {
        msg:"All fields are required",
        state:"",
        show:true
    }
    if(!username || !email || !password || !phone_number || !confirmPassword){
        changeErr(err)
        return false
    }
    if(!valid.isEmail(email)){
        changeErr({
            ...err,
            msg:"invalid email provided"
        })
        return false
    }
    if(!phone_number.startsWith("+254")){
        changeErr({
            ...err,
            msg:"Phone number must start with +254"
        })
        return false
    }
    if(phone_number.length !== 13){
        changeErr({
            ...err,
            msg:"Phone number must be 13 characters starting with +254"
        })
        return false
    }
    if(password !== confirmPassword){
        changeErr({
            ...err,
            msg:"Password do not match"
        })
        return false
    }
    if(!price.category || price.price === 0){
        changeErr({
            ...err,
            msg:"Please select a price choice"
        })
        return false
    }

    return true
}