import multer from "multer";
import path from "path";
import handleError from "../middlerare/error_logs/handleError.js";
import adminModal from "../modal/admin.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import faculityModal from "../modal/faculity.modal.js";
import courseModal from "../modal/course.modal.js";
const adminPath = path.join("public/admin/");
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, adminPath);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const adminMulter = multer({ storage: store });

export const adminCreate = async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;
  const adminProfile = req.file;
  // console.log(adminProfile)
  if (!adminProfile) {
    return handleError(res, 400, "please enter admin profile");
  }

  if (adminName && adminEmail && adminPassword) {
    const checkEamil = await adminModal.findOne({ adminEmail: adminEmail });
    if (checkEamil) return handleError(res, 400, "admin already exist");
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(adminPassword, salt);
      const adminCreate = new adminModal({
        adminName: adminName,
        adminEmail: adminEmail,
        adminPassword: hashpass,
        adminProfile: adminProfile.filename,
      });
      if (adminCreate) {
        const admin = await adminCreate.save();

        //  const userId= await adminModal.findOne({adminEmail:adminEmail})
        // console.log(admin)
        const token = jwt.sign({ token: admin._id }, process.env.SECURTY_KEY, {
          expiresIn: "4d",
        });
        return handleError(res, 201, "admin create sucessful", admin, token);
      } else {
        return handleError(res, "user not create ");
      }
    } catch (err) {
      return handleError(res, 500, "server err");
    }
  } else {
    return handleError(res, 400, "all feilds required");
  }
};

//! find by faculity fid and aid 
export const findFaculity= async (req,res)=>{
  const {AdminId,fId}=req.params;
  if(!mongoose.Types.ObjectId.isValid(AdminId)){
    return handleError(res,400,"admin key not valid")
  }
  if(!mongoose.Types.ObjectId.isValid(fId)){
    return handleError(res,400,"not faculityid id valid")
  }
  try{
     const checkAdmin=await adminModal.findById(AdminId)
     if(!checkAdmin){
      return handleError(res,400,"admin not found")
     }
  //  console.log(checkAdmin)
  const findFaculity= await faculityModal.findById(fId).populate("AdminId")
  if(findFaculity){
          return handleError(res,200,"find sucessful",findFaculity)
  }else{
    return handleError(res,400,"faculity not found this id")
  }
  }catch(err){
    return handleError(res,500 `server error ${err}`)
  }
}
 //! find all faculity by admin id 
 export const findAllFaculity=async (req,res)=>{
  const {AdminId}=req.params;
  console.log(AdminId)
  console.log("heloo")
  if(!mongoose.Types.ObjectId.isValid(AdminId)){
    return handleError(res,400,"please enter valid key")
  }
  try{
      const checkAdmin= await adminModal.findById(AdminId)
      if(!checkAdmin){
        return handleError(res,400,"admin not found this id")
      }
      const allFaculity=await faculityModal.find()
      if(allFaculity){
        return handleError(res,200,"sucess ",allFaculity)
      }else{
        return handleError(res,400,"not found faculity")
      }
  }catch(err){
    return handleError(res,500,`server error ${err}`)
  }
 }
 //! delete faculity by admin and faculity id
 export const deleteFaculity= async (req,res)=>{
  const {AdminId,fId}=req.params;
  if(!mongoose.Types.ObjectId.isValid(AdminId)){
    return handleError(res,400,"admin key not valid")
  }
  if(!mongoose.Types.ObjectId.isValid(fId)){
    return handleError(res,400,"faculity id not valid")
  }
  try{
    const checkadmin= await adminModal.findById(AdminId)
    if(!checkadmin){
      return handleError(res,400,"admin not found")
    }
    const deleteFaculity=await faculityModal.findByIdAndDelete(fId)
    if(deleteFaculity){
      const deleteAssociatedCourse= await courseModal.deleteMany({faculityId:fId})
      if(deleteAssociatedCourse)
      return handleError(res,200,"delete sucessful faculity and associated course deleted",deleteAssociatedCourse)
    }else{
      return handleError(res,400,"delte faild ")
    }
  }catch(err){
    return handleError(res,500,`server error ${err}`)
  }
 }
 //! delte all faculity by admin id
 export const deleteAllFaculity= async (req,res)=>{
  const {AdminId}=req.params;
  if(!mongoose.Types.ObjectId.isValid(AdminId)){
    return handleError(res,400,"admin key not valid")
  }
  try{
    const checkAdmin= await adminModal.findById(AdminId)
    if(!checkAdmin){
      return handleError(res,400,"admin not found ")
    }
    const deletall= await faculityModal.deleteMany() 
    if(deletall){
      return handleError(res,200,"delete all sucessful")
    }else{
      return handleError(res,400,"delte faild")
    }
  }catch(err){
    return handleError(res,500,`server error ${err}`)
  } 
 }
 //! get all course by admin id
 export const getAllcourseByAdminId=async (req,res)=>{
  const {AdminId}=req.params;
  // console.log(AdminId)
  if(!AdminId){
    return handleError(res,400,"admin id not found")
  }
  try{
    if(!mongoose.Types.ObjectId.isValid(AdminId)){
      return handleError(res,400,"admin id not valid")
    }
    const getAllCourse= await courseModal.find()
    if(getAllCourse){
      return handleError(res,200," get sucessful",getAllCourse)
    }
    console.log("get course")
  }catch(err){
    return handleError(res,500,`server error ${err}`)
  }
 }