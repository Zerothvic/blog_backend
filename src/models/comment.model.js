import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, "Comment text is required"],
            trim: true,
            maxlength: [1000, "Comments cannot exceed 1000 characters"]
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // Links the comment to a registered user
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post", // Links the comment to the specific blog post
            required: true,
            index: true // Faster lookups when loading a post's comments
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: "Comment", // Points to another comment if this is a reply
            default: null
        },
        isEdited: {
            type: Boolean,
            default: false
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

// Middleware to mark as edited if the content changes
commentSchema.pre("save", function (next) {
    if (this.isModified("content") && !this.isNew) {
        this.isEdited = true;
    }
    next();
});

export const Comment = mongoose.model("Comment", commentSchema);