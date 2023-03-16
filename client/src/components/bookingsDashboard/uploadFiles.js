
export const uploadFiles = (files, changeErr) => {
    const data = Array.from(files)
    if (data.length < 8){
        changeErr({
            msg: "Provide at least eight images",
            state: "",
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
        price_choices, validity } = body
    if (!image  || !name || !description || !city || !country || !category || !price_choices || !validity) {
        changeErr({
            msg: "All Fields are required",
            state: "",
            show: true,
        })
        return false
    }
    if (name.length < 3) {
        changeErr({
            msg: "Name must be atleast 3 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    if (name.length > 40) {
        changeErr({
            msg: "Name must be atleast 40 alphabets",
            state: "",
            show: true,
        })
    }
    if (description.length < 3) {
        changeErr({
            msg: "Name must be atleast 3 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    if (description.length > 400) {
        changeErr({
            msg: "Name must be atleast 400 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    if (price_choices.length === 0){
        changeErr({
            msg: "Price must be provided",
            state: "",
            show: true,
        })
        return false
    }
    if (category.length === 0){
        changeErr({
            msg: "Provide at least one category",
            state: "",
            show: true,
        })
        return false
    }
    const valid = new Date(validity) - new Date(new Date().setHours(23,59,59))
    if (valid < 0){
        changeErr({
            msg: "Provide a valid date i.e. starting from tommorow",
            state: "",
            show: true,
        })
        return false
    }
    if (city.length < 3){
        changeErr({
            msg: "city must be at least 3 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    if (city.length > 100){
        changeErr({
            msg: "city must be at most 100 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    if (country.length < 3){
        changeErr({
            msg: "country must be at least 3 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    if (country.length > 100){
        changeErr({
            msg: "country must be at most 100 alphabets",
            state: "",
            show: true,
        })
        return false
    }
    return true
} 