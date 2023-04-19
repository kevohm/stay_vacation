const mongoose = require("mongoose")

const Dislike = new mongoose.Schema({
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

Dislike.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Dislike", Dislike)