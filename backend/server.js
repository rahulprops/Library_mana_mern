import  'dotenv/config'
import express from 'express'
import db from './utils/database/db.js'
import bodyParser from 'body-parser'
import adminRouter from './utils/routes/admin.routes.js'
import cors from 'cors'
import lodash from 'lodash'
import faculityRouter from './utils/routes/faculity.routes.js'
import courseRouter from './utils/routes/course.routers.js'
import studentRouter from './utils/routes/student.routes.js'
import cookieParser from 'cookie-parser'
const app=express()
const port =process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 
app.use(cors("*"))
app.use(cookieParser())
app.use("/api/v1",adminRouter)
app.use("/api/v1",faculityRouter)
app.use("/api/v1",courseRouter)
app.use("/api/v1",studentRouter)

//  onst arr =[1,2,3,4,5,,6,6,]
//  const chunkArray=lodash.chumk(arr,2)
//   console.log(chuckArray

//! remove false value
// const arr =[9,1,2,3,4,false,"",3,4,5,]
// const filterFalseyval=lodash.compact(arr)
// console.log(filterFalseyval)

//! deep clone and object 
// const user= {
//     name:"abc",
//     email:"abc@",
//     mobile:"52265262"
// }
// const deepClone = lodash.cloneDeep(user)
// deepClone.email="hello@";
// console.log(deepClone.email)
// console.log(user.email)

//! string operation 
// const lower= "hello wor?
// const capitalizer=lodash.capitalize(lower)
// console.log(capitalizer)
//  const uppercase=lodash.upperCase(lower)
// console.log(uppercase)

app.listen(port,()=>{
    console.log(`server on runing http://localhost:/${port}`)
    db()
})