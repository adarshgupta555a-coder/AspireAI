import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email:{
        type: String,
        require:[true,"email is required."]
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:[true, "user is required."]
    },

    OtpHash: {
        type: String,
        require:[true,"otp hash is required."]
    }
})

const OtpModel = mongoose.model("otp", OtpSchema);

export default OtpModel;