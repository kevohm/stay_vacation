const mongoose = require("mongoose")
const Event = require("./Event")

const Like = new mongoose.Schema({
    user :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        autopopulate:true
    },
    event :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        autopopulate:true
    }
},
{ timestamps: true }
)

Like.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Like", Like)