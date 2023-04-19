const mongoose = require("mongoose")
const {deleteImage} = require("../utils/cloudinary")

const Poster = new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event",
        autopopulate:true
    },
    public_id:{
        type:String,
        required:[true, "Please provide an uuid"]
    },
    image:{
        type:String,
        required:[true, "Please provide an image"]
    },createdAt: {
        type: Date,
        required: [true, "Please provide date created"],
      },
      updatedAt: {
          type: Date,
          required:[true, "Please provide date updated"]
        }
})

Poster.post("findOneAndDelete",async function(doc){
    const {public_id} = doc
    await deleteImage(public_id)
})

Poster.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Poster",Poster);