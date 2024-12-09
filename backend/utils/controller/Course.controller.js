import multer from "multer";
import handleError from "../middlerare/error_logs/handleError.js";
import path from "path";
import mongoose from "mongoose";
import faculityModal from "../modal/faculity.modal.js";
import courseModal from "../modal/course.modal.js";
const coursePath = path.join("public/courses/");
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, coursePath);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});
export const courseMulter = multer({
  storage: store,
});
//! create courese controller
export const createCourse = async (req, res) => {
  const { courseTitle, courseContent } = req.body;
  const couresPdf = req.file;
  const {fId}=req.params;
    
  if(!fId){
    return handleError(res,400,"pleaser enter faculity key")
  }
  const isvalidFaculityId= await faculityModal.findById(fId)
  if(!isvalidFaculityId){
    return handleError(res,400," not found faculity this id")
  }
//   console.log(isvalidFaculityId);
 if(!couresPdf){
    return handleError(res,400,"image not found")
 }
 
//   console.log(courseContent);
if(courseTitle && courseContent && couresPdf){
    try {
        if(!mongoose.Types.ObjectId.isValid(fId)){ 
          return handleError(res,400,"please enter valid key")
        }
        const storeCourse= new courseModal({
            courseTitle:courseTitle,
            courseContent:courseContent,
            coursePdf:couresPdf.filename,
            courseAuthor:isvalidFaculityId.faculityName,
            faculityId:fId 
        })
        if(storeCourse){
          const saveCourse= await storeCourse.save()
          if(saveCourse)
            return  handleError(res,201,"create course sucessful",saveCourse)
        }else{
            return handleError(res,400," can not store course")
        }
    //   console.log("hello course");
    } catch (err) {
      return handleError(res, 500, `server error ${err}`);
    }
}
else{
    return handleError(res,400,"all feilds requireds")
}
  
};
