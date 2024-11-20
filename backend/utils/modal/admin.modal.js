import mongoose from "mongoose";

const adminSchmea= new  mongoose.Schema({
    adminName:String,
    adminEmail:{
        type:String,
        required:true,
        unique:true,
    },
    adminPassword:String,
    adminProfile:String,
})
const adminModal= mongoose.model("admindata",adminSchmea)
export default adminModal;