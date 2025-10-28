import { ErrorGlobal } from "../utils/Global"
export const uploadFiles = (files, changeErr) => {
    const data = Array.from(files)
    if (data.length < 8){
        changeErr({
            msg: "Provide at least eight images",
            type: "warning",
            show: true,
        })
        return []
    }
    return Promise.all(
        data.map(
            (file) => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "stay_vacations");
                formData.append("api_key", "377354856881691")
                formData.append("folder", "stay_vacations_images");
                fetch("https://api.cloudinary.com/v1_1/dxxbxjiox/image/upload", {
                    method: "post",
                    body: formData,
                })
                    .then((resp) => resp.json())
                    .then((data) => resolve(data.url))
                    .catch((err) => reject(err));
            })
        )
    )
}

export const verifyData = (body, changeErr) => {
    const { image, name, description, city, country, category,
        price_choices, validity ,Amenities} = body
        const err = {
            msg: "All Fields are required",
            type: "warning",
            show: true,
        }
    if (!Amenities || !image  || !name || !description || !city || !country || !category || !price_choices || !validity) {
        changeErr(err)
        return false
    }
    if (name.length < 3) {
        changeErr({
            ...err,
            msg: "Name must be atleast 3 alphabets",
        })
        return false
    }
    if (name.length > 40) {
        changeErr({
            ...err,
            msg: "Name must be atleast 40 alphabets",
        })
        return false
    }
    if (description.length < 300) {
        changeErr({
            ...err,
            msg: "Description must be atleast 300 characters",
        })
        return false
    }
    if (description.length > 1000) {
        changeErr({
            ...err,
            msg: "Description must be atmost 1000 characters",
        })
        return false
    }
    if (price_choices.length === 0){
        changeErr({
            ...err,
            msg: "Price must be provided",
        })
        return false
    }
    if (category.length === 0){
        changeErr({
            ...err,
            msg: "Provide at least one category",
        })
        return false
    }if(Amenities.length < 3){
        changeErr({
            ...err,
            msg: "Provide at least three amenities",
        })
        return false
    }
    const valid = new Date(validity) - new Date(new Date().setHours(23,59,59))
    if (valid < 0){
        changeErr({
            ...err,
            msg: "Provide a valid date i.e. starting from tommorow",
        })
        return false
    }
    if (city.length < 3){
        changeErr({
            ...err,
            msg: "city must be at least 3 alphabets",
        })
        return false
    }
    if (city.length > 100){
        changeErr({
            ...err,
            msg: "city must be at most 100 alphabets",
        })
        return false
    }
    if (country.length < 3){
        changeErr({
            ...err,
            msg: "country must be at least 3 alphabets",
        })
        return false
    }
    if (country.length > 100){
        changeErr({
            ...err,
            msg: "country must be at most 100 alphabets",
        })
        return false
    }
    return true
} 