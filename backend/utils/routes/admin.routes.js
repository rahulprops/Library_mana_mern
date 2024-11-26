import express from 'express'
import multer from 'multer'
import { adminCreate, adminMulter, findAllFaculity, findFaculity } from '../controller/Admin.controller.js'
const adminRouter=express.Router()
adminRouter.post("/admin-create", adminMulter.single("adminProfile"),adminCreate)
adminRouter.get("/faculity-find/admin/:AdminId/:fId",findFaculity)
adminRouter.get("/faculity-all/admin/:AdminId",findAllFaculity)
export default adminRouter;