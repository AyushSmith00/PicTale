import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        content: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
            default: ""
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        crop: {
            x: {
                type: Number,
                default: 50,
            },
            y: {
                type: Number,
                default: 50,
            }
        }
        
    }, {timestamps: true},
)

const Post = mongoose.model("Post", postSchema);

export default Post