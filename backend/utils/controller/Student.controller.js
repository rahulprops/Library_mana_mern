import mongoose from "mongoose";
import handleError from "../middlerare/error_logs/handleError.js";
import adminModal from "../modal/admin.modal.js";
import multer from "multer";
import path from "path";
import bcrypt from 'bcrypt'
import studentModal from "../modal/student.modal.js";
const studentPath = path.join("public/student/");
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, studentPath);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});
export const studentMulter = multer({ storage: store });
export const studentRegistor = async (req, res) => {
  const { studentName, studentEmail, studentPassword } = req.body;
  const studentPhoto = req.file;
  if (!studentPhoto) {
    return handleError(res, 400, "please select sudent photo");
  }

  const { AdminId } = req.params;
  //  console.log(AdminId)
  if (!AdminId) {
    return handleError(res, 400, "please enter admin id");
  }

  //  console.log(isvalidAdminId)
  if(studentName && studentEmail && studentPassword && studentPhoto){
    try {
        if (!mongoose.Types.ObjectId.isValid(AdminId)) {
          return handleError(res, 400, "admin key not right ");
        }
        const isvalidAdminId = await adminModal.findById(AdminId);
        if (!isvalidAdminId) {
          return handleError(res, 400, "admin id not valid ");
        }
        const ischeckexistStudent= await studentModal.findOne({StudentEmail:studentEmail})
        if(ischeckexistStudent){
            return handleError(res,400,"student already exists")
        }
        const hashpass= await bcrypt.hash(studentPassword ,12)
        const registorStudent= new studentModal({
            StudentName:studentName,
            StudentEmail:studentEmail,
            StudentPassword:hashpass,
            StudentPhoto:studentPhoto.filename,
            AdminId:AdminId,
        })
        if(registorStudent){
              const registor= await registorStudent.save()
              if(registor)
                return handleError(res,201,"registor sucressful",registorStudent)
        }else{
            return handleError(res,400,"can not create student")
        }
        console.log("sutent")
      } catch (err) {
        return handleError(res, 500, `server error ${err}`);
      }
  }else{
    return handleError(res,400,"all feilds required ")
  }
  
};
