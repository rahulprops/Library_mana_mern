import express from 'express'
import { createFaculity, faculityMulter, loginFaculity } from '../controller/faculity.controller.js';
const faculityRouter=express.Router();
 faculityRouter.post("/:Id/create-faculty",faculityMulter.single("faculityPhoto"), createFaculity)
 faculityRouter.post("/login",loginFaculity)
  export default faculityRouter;