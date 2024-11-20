import  'dotenv/config'
import express from 'express'
import db from './utils/database/db.js'

const app=express()
const port =process.env.PORT
app.listen(port,()=>{
    console.log(`server on runing http://localhost:/${port}`)
    db()
})