import express from 'express'
import multer from 'multer'
import { adminCreate, adminMulter } from '../controller/Admin.controller.js'
const adminRouter=express.Router()
adminRouter.post("/admin-create", adminMulter.single("adminProfile"),adminCreate)
export default adminRouter;