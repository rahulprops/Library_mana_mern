import express from 'express'
import { createFaculity, faculityMulter } from '../controller/faculity.controller.js';
const faculityRouter=express.Router();
 faculityRouter.post("/create-faculty", createFaculity)
  export default faculityRouter;