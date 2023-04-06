const notFound = (req,res,next) => {
    return res.status(404).json({msg:"Oops, route does not exist"})
}
module.exports = notFound