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
    AdminId:{
        // type:mongoose.sc,
        ref:mongoose.Schema.ObjectId,
        required:true
    }
})
const faculityModal= mongoose.model("faculity",faculitySchema)
export default faculityModal;