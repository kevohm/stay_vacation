const { StatusCodes } = require("http-status-codes")
const Poster = require("../models/Poster")
const Event = require("../models/Event")
const {uploadImage} = require("../utils/cloudinary")
const {BadRequest, NotFound} = require("../errors/index")

const createPoster = async(req,res) => {
    const {eventId} = req.params
    const {image} = req.files
    if(!image){
        throw new BadRequest("Please provide image")
    }
    const current = await Event.findOne({_id:eventId})
    if(!current){
        throw new BadRequest("invalid details provided")
    }
    const event = await Poster.findOne({event: eventId})
    if(event){
        throw new BadRequest("Poster for event was already created")
    }
    const name = `${current.name.replace(" ","_")}_${new Date().toISOString()}`
    const data = await uploadImage(image.tempFilePath,name)
    const {public_id,secure_url} = data
    await Poster.create({
        public_id,
        image:secure_url, 
        event:eventId,
        createdAt:current.
        createdAt,updatedAt:
        current.createdAt})
    res.status(StatusCodes.CREATED).json({msg:"poster created"})
}

const getPosters = async(req,res) => {
    const {limit,page,sort,arrange} = req.query
    const currentLimit = Number(limit) || 12 
    const currentPage =  Number(page) || 1
    const skip = (currentPage - 1) * currentLimit
    const currentSort = {[sort || "createdAt"]:arrange || "desc"}
    const count = await Poster.find({}).count()
    const posters = await Poster.find({}).skip(skip).sort(currentSort)
    const pages = Math.ceil(count / currentLimit)
    res.status(StatusCodes.OK).json({msg:"All posters", posters, pages:{currentPage,pages}})
}

const getPoster = async(req,res) => {
    const {posterId} = req.params
    const poster = await Poster.findOne({_id:posterId})
    if(!poster){
        throw new NotFound("Poster not found")
    }
    res.status(StatusCodes.OK).json({msg:"Poster found", poster})
}

const deletePoster = async(req,res) => {
    const {posterId} = req.params
    const current = await Poster.findOne({_id: posterId})
    if(!current){
        throw new NotFound("Poster not found")
    }
    const poster = await Poster.findOneAndDelete({_id: posterId})
    if(!poster){
        throw new BadRequest("Poster not deleted")
    }
    res.status(StatusCodes.OK).json({msg:"Poster deleted"})
}

module.exports = {createPoster,getPosters,getPoster,deletePoster}