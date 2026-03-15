import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  type:{
    type:String,
    enum:["like","comment","bookmark"]
  },

  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  },

  read:{
    type:Boolean,
    default:false
  }

},{
  timestamps:true
});

export default mongoose.model("Notification", NotificationSchema);