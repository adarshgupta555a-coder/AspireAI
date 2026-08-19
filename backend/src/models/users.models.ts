import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true,"username is required"],
        min: [6, "Minimum 6 characters required"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        require: [true, "password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profession: {
        type: String,
        require: [true, "profession is required"]
    }
})

const userModel = mongoose.model("user",UserSchema);

export default userModel;