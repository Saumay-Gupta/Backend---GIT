// First we use with "TRY AND CATCH"

// const asyncHandler = (funct) => { async (req,res,next)=>{
//     try{
//         await funct(req,res,next)
//     }catch(err){
//         res.status(err.code || 500).json({
//             sucess:false,
//             message:err.message
//         })
//     }
// }}

// Second we will use with "PROMISES"
const asyncHandler = (funct)=>{
    (req,res,next)=>{
        Promise.resolve(funct(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler}