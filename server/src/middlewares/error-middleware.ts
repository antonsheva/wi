import ApiError from '../exceptions/api-error'

module.exports = (err:any, req:any, res:any, next:any) => {
    console.log("===============================")
    console.log(err.message);
    console.log("+++++++++++++++++++++++++++++++")
    if (err instanceof ApiError){
        console.log("err instanceof is ApiError")

        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log("err instanceof is not ApiError")
    return res.status(500).json({message: err.message})
}




