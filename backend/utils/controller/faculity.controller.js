import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import faculityModal from '../modal/faculity.modal.js'
import multer from 'multer'
import handleError from '../middlerare/error_logs/handleError.js'
 import path from 'path'
import adminModal from '../modal/admin.modal.js'

 const facuDir= path.join("public/faculity/")
 const facStore= multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null , facuDir)
    },
    filename:(req,file,cb)=>{
        return cb(null, file.originalname)
    }
 })
export const faculityMulter=multer({storage:facStore})
//! create faculity controller

export const createFaculity= async (req,res)=>{
    const Id = req.params.Id;
    // console.log("Route ID:", Id);
    // console.log(Id)
    const {faculityName ,faculityEmail,faculityPhone, faculityPassword}=req.body;
    // console.log(faculityEmail)
    if(!faculityName || !faculityEmail || !faculityPhone || !faculityPassword){
        return handleError(res,400, "all feilds required ")
    }
    
    // console.log(Id)
    try{
        const checkAdmin= await adminModal.findById(Id)
        // console.log(checkAdmin)
        if(!checkAdmin){
            return handleError( res,400 , "please enter currect key")
        }
        


    }catch(err){
        return handleError(res, 500, `server error ${err}`)
    }
}