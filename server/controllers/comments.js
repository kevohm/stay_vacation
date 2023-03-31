const Comment = require("../models/Comments")
const {StatusCodes} = require("http-status-codes")
const { BadRequest, NotFound } = require("../errors")
const Event = require("../models/Event")
const User = require("../models/User")

const getAll = async(req,res)=>{
    const {user,event} = req.query
    const filter = {}
    if(user){
        filter["user"]= user
    }
    if(event){
        filter["event"]= event
    }
    const comments = await Comment.find(filter)
    res.status(StatusCodes.OK).json({msg:"Found all comments",comments})
}

const getSingle = async(req,res)=>{
    const {commentId} = req.params
    const comment = await Comment.findOne({_id:commentId})
    if(!comment){
        throw new NotFound("comment not found")
    }
    res.status(StatusCodes.OK).json({msg:"Comment found",comment})
}

const addComment = async(req,res)=>{
    const {eventId} = req.params
    const {userId} = req.user
    const {description,createdAt} = req.body
    if(!description || !createdAt){
        throw new BadRequest("invalid details provided")
    }
    const event = await Event.findOne({_id:userId})
    if(!event){
        throw new BadRequest("Invalid event provided")
    }
    const oldComment = await Comment.findOne({event:eventId, user:userId})
    if(oldComment){
        throw new BadRequest("Already commented on event")
    }
    const comment = await Comment.create({description,event:eventId,user:userId,createdAt,updatedAt:createdAt})
    if(!comment){
        throw new BadRequest("Invalid details provided")
    }
    res.status(StatusCodes.CREATED).json({msg:"Successfully created comment"})
}


const removeComment = async(req,res)=>{
    const {commentId} = req.params
    const comment = await Comment.findByIdAndDelete(commentId)
    if(!comment){
        throw new NotFound("comment does not exist")
    }
    res.status(StatusCodes.OK).json({msg:"comment deleted"})
}

const updateComment = async(req,res)=>{
    const {commentId} = req.params
    const {description} = req.body
    if(!description){
        throw new BadRequest("Description required")
    }
    const comment = await Comment.findByIdAndUpdate(commentId,{description},{new:true,runValidators:true})
    if(!comment){
        throw new NotFound("comment does not exist")
    }
    res.status(StatusCodes.OK).json({msg:"comment updated"})
}

module.exports = {getAll,getSingle,addComment,updateComment,removeComment}