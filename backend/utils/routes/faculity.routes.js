import express from 'express'
import { createFaculity, faculityMulter, getCourse, loginFaculity, updateFaculity } from '../controller/faculity.controller.js';
const faculityRouter=express.Router();
 faculityRouter.post("/:Id/create-faculty",faculityMulter.single("faculityPhoto"), createFaculity)
 faculityRouter.post("/login",loginFaculity)
 faculityRouter.put("/admin/:AdminId/faculity-update",updateFaculity)
 faculityRouter.get("/get-course/faculity/:fid",getCourse)
  export default faculityRouter;