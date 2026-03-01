import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [150, "Title cannot exceed 150 characters"]
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true // Optimizes searching by URL
        },
        content: {
            type: String,
            required: [true, "Post content cannot be empty"]
        },
        excerpt: {
            type: String,
            trim: true,
            maxlength: 300
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // Assumes you have a User model
            required: true
        },
        tags: [{
            type: String,
            trim: true
        }],
        featuredImage: {
            type: String, // URL to the image
            default: ""
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        }
    },
    {
        timestamps: true // Automatically creates createdAt and updatedAt
    }
);

export const Post = mongoose.model("Post", postSchema);