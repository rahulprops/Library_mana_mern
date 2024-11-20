import "dotenv/config";
import mongoose from "mongoose";
 const str= process.env.DB || ""
 if(!str){
    console.log("missing db connection")
 }
const db=async ()=>{
    try{
        const db= await mongoose.connect(str)
        if(db){
            console.log("database connect ")
        }
        else{
            console.log("not connect database")
        }
    }catch(err){
       return console.log(err)
    }
}
export default db;