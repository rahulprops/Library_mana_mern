import express from 'express'
import { createFaculity, faculityMulter } from '../controller/faculity.controller.js';
const faculityRouter=express.Router();
 faculityRouter.post("/:Id/create-faculty",faculityMulter.single("faculityPhoto"), createFaculity)
  export default faculityRouter;