import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import faculityModal from '../modal/faculity.modal.js'
import multer from 'multer'
import handleError from '../middlerare/error_logs/handleError.js'
 import path from 'path'

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
    const {id}=req.params;
    const {faculityName ,faculityEmail,faculityPhone, faculityPassword}=req.body;
    console.log(faculityName)
    try{}catch(err){
        return handleError(res, 500, "server err")
    }
}