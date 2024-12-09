import express from 'express'
import { courseMulter, createCourse } from '../controller/Course.controller.js'
const courseRouter= express.Router()
courseRouter.post("/create-coures/faculity/:fId",courseMulter.single("couresPdf"),createCourse)
export default courseRouter;
