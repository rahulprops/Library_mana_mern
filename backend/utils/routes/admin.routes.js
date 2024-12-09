import express from 'express'
import multer from 'multer'
import { adminCreate, adminMulter, deleteAllFaculity, deleteFaculity, findAllFaculity, findFaculity, getAllcourseByAdminId } from '../controller/Admin.controller.js'
const adminRouter=express.Router()
adminRouter.post("/admin-create", adminMulter.single("adminProfile"),adminCreate)
adminRouter.get("/faculity-find/admin/:AdminId/:fId",findFaculity)
adminRouter.get("/faculity-all/admin/:AdminId",findAllFaculity)
adminRouter.delete("/faculity-delete/admin/:AdminId/:fId",deleteFaculity)
adminRouter.delete("/faculity-deletemany/admin/:AdminId",deleteAllFaculity)
adminRouter.get("/all-course/admin/:AdminId",getAllcourseByAdminId)
export default adminRouter;