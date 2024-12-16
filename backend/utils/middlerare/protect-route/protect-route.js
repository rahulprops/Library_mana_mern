import handleError from "../error_logs/handleError.js";
import jwt from 'jsonwebtoken'

function protectRoute(req,res,next){
 const token=req.cookies.accessToken;
//  console.log(token)
 if(!token){
    return handleError(res,400,"data key not found")
 
}
jwt.verify(token,"secret",(err,decode)=>{
    if(err){
        return handleError(res,400,"invalid token")
    }
    req.userid=decode.userid
    next()
})
}
export default protectRoute;