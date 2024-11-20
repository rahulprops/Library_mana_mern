import "dotenv/config";
import mongoose from "mongoose";

const db=async ()=>{
    try{
        const db= await mongoose.connect(process.env.DB)
        if(db){
            console.log("database connect ")
        }
        else{
            console.log("not connect database")
        }
    }catch(err){
        console.log(err)
    }
}
export default db;