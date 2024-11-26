import express from 'express'
import multer from 'multer'
import { adminCreate, adminMulter, findFaculity } from '../controller/Admin.controller.js'
const adminRouter=express.Router()
adminRouter.post("/admin-create", adminMulter.single("adminProfile"),adminCreate)
adminRouter.get("/faculity-find/admin/:AdminId/:fId",findFaculity)
export default adminRouter;