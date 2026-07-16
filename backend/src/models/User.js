import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "Username should be unique"],
        trim: true,
        minlength: [6, "The minimum leght is 6"],
        maxlength: [38, "The maximum length is 38"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "minimum length should be 6"]
    },
    avatar: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: null,
    }
}, {timestamps: true}),

const User = mongoose.model("User", userSchema)

export default User