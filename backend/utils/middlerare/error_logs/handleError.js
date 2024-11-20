function handleError(res,status,message,data,token){
   res.status(status).json({message:message,data,token})
}
export default handleError;