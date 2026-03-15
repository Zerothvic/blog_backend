import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
  {
    type: String,
    lowercase: true,
    trim: true
  }
],
bookmarks:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:"Post"
}],

views: {
  type: Number,
  default: 0
},
slug: {
  type: String,
  unique: true
},
status: {
  type: String,
  enum: ["draft", "published"],
  default: "published"
},
bio:String,
avatar:String,
followers:[{
 type:mongoose.Schema.Types.ObjectId,
 ref:"User"
}],
likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

image:{
  type:String
}
  },
  { timestamps: true }
);



export default model("Post", postSchema);
