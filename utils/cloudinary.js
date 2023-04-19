const cloudinary = require("cloudinary").v2



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  

const uploadImage = (file,name)=>{
    return cloudinary.uploader.upload(file,{
        resource_type:"auto",
        public_id:name,
        folder: process.env.UPLOAD_FOLDER
})
}
const deleteImage = (name)=>{
    return cloudinary.uploader.destroy(name);
}
   
module.exports = {uploadImage,deleteImage}