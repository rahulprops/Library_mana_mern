import express from 'express'
import { studentMulter, studentRegistor } from '../controller/Student.controller.js'
const studentRouter=express.Router()

studentRouter.post("/registor-student/admin/:AdminId",studentMulter.single("studentPhoto"),studentRegistor)
export default studentRouter;