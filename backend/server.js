import  'dotenv/config'
import express from 'express'
import db from './utils/database/db.js'
import bodyParser from 'body-parser'
import adminRouter from './utils/routes/admin.routes.js'
import cors from 'cors'
import faculityRouter from './utils/routes/faculity.routes.js'
import courseRouter from './utils/routes/course.routers.js'
import studentRouter from './utils/routes/student.routes.js'
const app=express()
const port =process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 
app.use(cors("*"))
app.use("/api/v1",adminRouter)
app.use("/api/v1",faculityRouter)
app.use("/api/v1",courseRouter)
app.use("/api/v1",studentRouter)
app.listen(port,()=>{
    console.log(`server on runing http://localhost:/${port}`)
    db()
})