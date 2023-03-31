const {StatusCodes} = require("http-status-codes")
const { NotFound, BadRequest } = require("../errors")
const Category = require("../models/Category")

const getAll = async (req, res)=>{
    const categories = await Category.find({})
    if(!categories){
        throw new NotFound("Categories not found")
    }
    res.status(StatusCodes.OK).json({msg:"All Categories found",categories})
}

const getSingle = async (req, res)=>{
    const {categoryId} = req.params
    const category = await Category.findOne({_id:categoryId})
    if (!category){
        throw new NotFound("Category not found")
    }
    res.status(StatusCodes.OK).json({msg:"Category found",category})
}
const createOne = async (req, res)=>{
    const {name,createdAt} = req.body
    if(!name){
        throw new BadRequest("Please provide name")
    }
    if(!createdAt){
        throw new BadRequest("Please provide createdAt")
    }
    const category = await Category.create({name:name.toLowerCase(),createdAt,updatedAt:createdAt})
    if(!category){
        throw new BadRequest("category not created")
    }
    res.status(StatusCodes.CREATED).json({msg:"Category created"})
}
const updateOne = async (req, res)=>{
    const {categoryId} = req.params
    const {updatedAt, name} = req.body
    if(!name){
        throw new BadRequest("Please provide name")
    }
    if(!updatedAt){
        throw new BadRequest("Please provide updatedAt")
    }
    const category = await Category.findByIdAndUpdate(categoryId,{updatedAt, name:name.toLowerCase()},{new:true,runValidators:true})
    if(!category){
        throw new NotFound("Category does not exist")
    }
    res.status(StatusCodes.OK).json({msg:"Category updated"})
}

const deleteOne= async (req, res)=>{
    const {categoryId} = req.params
    const category = await Category.findOneAndDelete({_id:categoryId})
    if(!category){
        throw new NotFound("Category not found")
    }
    res.status(StatusCodes.OK).json({msg:"Category deleted"})
}

module.exports = {getAll,getSingle,createOne,updateOne,deleteOne}