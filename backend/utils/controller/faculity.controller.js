import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import faculityModal from "../modal/faculity.modal.js";
import multer from "multer";
import handleError from "../middlerare/error_logs/handleError.js";
import path from "path";
import adminModal from "../modal/admin.modal.js";
import mongoose from "mongoose";
import courseModal from "../modal/course.modal.js";

const facuDir = path.join("public/faculity/");
const facStore = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, facuDir);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});
export const faculityMulter = multer({ storage: facStore });
//! create faculity controller

export const createFaculity = async (req, res) => {
  const Id = req.params.Id;

  const { faculityName, faculityEmail, faculityPhone, faculityPassword } =
    req.body;
  // console.log(faculityEmail)
  const faculityPhoto = req.file;
  if (!faculityPhoto) {
    return handleError(res, 400, "please enter photo");
  }
  //  console.log(faculityPhoto.filename)
  if (!faculityName || !faculityEmail || !faculityPhone || !faculityPassword) {
    return handleError(res, 400, "all feilds required ");
  }

  // console.log(Id)
  try {
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return handleError(res, 400, "please enter validkey");
    }
    const checkAdmin = await adminModal.findById(Id);
    // console.log(checkAdmin)
    if (!checkAdmin) {
      return handleError(res, 400, "please enter currect key");
    }
    // console.log("20");
    const faculityfindEmail = await faculityModal.findOne({
      faculityEmail: faculityEmail,
    });
    if (faculityfindEmail) {
      return handleError(res, 400, "email already exits");
    }
    const hashPass = await bcrypt.hash(faculityPassword, 12);
    // console.log(hashPass)
    const createFaculity = new faculityModal({
      faculityName: faculityName,
      faculityEmail: faculityEmail,
      faculityPassword: hashPass,
      faculityPhoto: faculityPhoto.filename,
      AdminId: Id,
    });
    if (createFaculity) {
      const faculityCreate = await createFaculity.save();
      return handleError(res, 400, "create sucessful", faculityCreate);
    } else {
      return handleError(res, 400, "faculity create failed ");
    }
  } catch (err) {
    return handleError(res, 500, `server error ${err}`);
  }
};
  
function AccessToken(userid){
  return jwt.sign({userid:userid},"secret",{expiresIn:"2m"})
}
// ! login faculity 
export const loginFaculity = async (req, res) => {
    const { faculityEmail, FaculityPassword } = req.body;

    if (!faculityEmail || !FaculityPassword) {
        return handleError(res, 400, "All fields are required");
    }

    try {
        // Check if email exists
        const checkEmail = await faculityModal.findOne({ faculityEmail: faculityEmail });
        if (!checkEmail) {
            return handleError(res, 400, "Email does not exist"); // Add return here
        }

        // Compare passwords
        const comparePass = await bcrypt.compare(FaculityPassword, checkEmail.faculityPassword);
        if (comparePass) {
            if(checkEmail){
              const userid=checkEmail._id;
                // console.log(userid)
                const token= AccessToken(userid)
                res.cookie("accessToken",token,{httpOnly:true,maxAge:2*60*1000})
              return handleError(res, 200, "Login successful", checkEmail,token); // Add return here
            }else{
              return handleError(res,400,"check mail not found")
            }
           
        } else {
            return handleError(res, 400, "Invalid password"); // Add return here
        }
    } catch (err) {
        // Handle server errors
        return handleError(res, 500, `Server error: ${err.message}`); // Add return here
    }
};

//! update faculity 
export const updateFaculity= async (req,res)=>{
    const {AdminId}=req.params;
    const {faculityName,faculityEmail,faculityPhone}= req.body;
    // console.log(faculityPhone)
    if(!mongoose.Types.ObjectId.isValid(AdminId)){
        return handleError(res,400,"admin key not valid")
    }
    if (!faculityName || !faculityEmail || !faculityPhone) {
        return handleError(res, 400, "All fields are required");
    }
    try{
        const checkAdmin=  await adminModal.findById(AdminId)
        if(!checkAdmin){
            return handleError(res,400,"admin not found")
        }
        const updatedFaculity = await faculityModal.findOneAndUpdate(
            { faculityEmail: faculityEmail }, // Filter condition
            {
                faculityName: faculityName,
                faculityPhone: faculityPhone,
            },
            { new: true } // Return the updated document
        );
        if(updatedFaculity){
            return handleError(res,200,"update sucessful",updatedFaculity)
        }else{
            return handleError(res,400,"not found update faild")
        }
        
    }catch(err){
        return handleError(res,400,`server error ${err}`)
    }
}
//! get couse by fuclity id
export const getCourse= async (req,res)=>{
  const {fid}=req.params;
  // console.log(fid)
  if(!fid){
    return handleError(res,400,"faculity not found")
  }
  try{
    if(!mongoose.Types.ObjectId.isValid(fid)){
      return handleError(res,400,"faculity key not valid")
    }
    const isvalidFaculityId= await faculityModal.findById(fid)
    if(!isvalidFaculityId){
      return handleError(res,400,"this id not found faculity")
    }
    const getcourse=await courseModal.find({faculityId:fid})
    if(getcourse){
      return handleError(res,200,"get course sucessful",getcourse)
    }else{
      return handleError(res,400,"not get course")
    }
    
  }catch(err){
    return handleError(res,500,"server error")
  }
}

//! reset password faculity
export const resetPaasword= async (req,res)=>{
  const {fid}=req.params;
  const {faculityNewPassword,faculityoldPassword}=req.body
  if(!mongoose.Types.ObjectId.isValid(fid)){
    return handleError(res,400,"valid faculity id")
  }
  if(!faculityNewPassword || !faculityoldPassword){
    return handleError(res,400,"all feilds required")
  }
  try{
       const isvalidFaculity= await faculityModal.findById(fid) 
       if(!isvalidFaculity){
        return handleError(res,400,"faculity not found")
       }
      
      // compare password
      const compare = await bcrypt.compare(faculityoldPassword,isvalidFaculity.faculityPassword)
      if(!compare){
        return handleError(res,400,"password not match")
      }
      // new password compare
      const newpasscompare= await bcrypt.compare(faculityNewPassword,isvalidFaculity.faculityPassword)
       if(newpasscompare){
        return handleError(res,400,"given password match enter new password")
       }
       // hash new password
       const newhaspass= await bcrypt.hash(faculityNewPassword,12)
       const updatepassword= await faculityModal.findByIdAndUpdate(fid,{faculityPassword:newhaspass}) 
            
            const saveResetPassword= await updatepassword.save()
       if(saveResetPassword){
        return handleError(res,200,"password changed sucessful")
       }
       else{
        return handleError(res,400," faild updatenew password")
       }
  }catch(err){
    return handleError(res,500,`server error ${err}`)
  }
}
//! delete associatecorsecourse delete add logic faculity delete admin after delete faculity 
//! all delete course by admin id admin controller me deletemany()
// get all courses by admon id find() 