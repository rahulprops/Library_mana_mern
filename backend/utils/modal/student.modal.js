import mongoose, { Schema } from "mongoose";

const studentSchema= new Schema({
     StudentName:String,
     StudentEmail:{
        type:String,
        required:true,
        unique:true,
     },
     StudentPassword:{
        type:String,
        select:false,
     },
     StudentPhoto:{
      type:String,
      required:true,
     },
     AdminId:{
        type:mongoose.Schema.ObjectId,
        ref:"admindata",
        required:true,
     }
},{timestamps:true})

const studentModal= mongoose.model("student",studentSchema)
export default studentModal;