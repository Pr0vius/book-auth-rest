const errorHandler = (err, req, res, next)=>{
    console.log('Controllers Errors: ', err);
    res.status(500).json({status:500, Error: err.message})
}

module.exports = errorHandler