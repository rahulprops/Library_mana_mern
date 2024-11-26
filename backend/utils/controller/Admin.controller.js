import multer from "multer";
import path from "path";
import handleError from "../middlerare/error_logs/handleError.js";
import adminModal from "../modal/admin.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import faculityModal from "../modal/faculity.modal.js";
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