import mongoose from "mongoose";

const faculitySchema= new mongoose.Schema({
    faculityName:String,
    faculityEmail:{
        type:String,
        required:true,
        unique:true
    },
    faculityPassword:String,
    faculityPhone:{
        type:Number
    },
    faculityPhoto:{
        type:String,
    },
    AdminId:{
        type:mongoose.Schema.ObjectId,
        ref:"admindata",
        required:true
    }
},{timestamps:true})
const faculityModal= mongoose.model("faculity",faculitySchema)
export default faculityModal;