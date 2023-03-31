const { BadRequest, NotFound } = require("../errors")
const Comment = require("../models/Comments")
const secureUandD = async (req,res,next)=>{
    const {userId} = req.user
    const {commentId} = req.params
    const comment = await Comment.findOne({_id:commentId})
    if(!comment){
        throw new NotFound("comment does not exist")
    }
    if(comment.user.toString() === userId){
        next()
    }
    throw new BadRequest("Cannot change this information")
}

module.exports = secureUandD