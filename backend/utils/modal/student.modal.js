import mongoose, { Schema } from "mongoose";

const studentSchema= new Schema({
     StudentName:String,
     StudentEmail:{
        type:String,
        required:true,
        unique:true,
     },
     StudentPassword:String,
     AdminId:{
        type:mongoose.Schema.ObjectId,
        ref:"admindata",
        required:true,
     }
},{timestamps:true})

const studentModal= mongoose.model("student",studentSchema)
export default studentModal;