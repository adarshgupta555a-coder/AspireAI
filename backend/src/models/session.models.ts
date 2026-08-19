import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: [true, "user id is required."]
    },

    ip: {
        type: String,
        require: [true, "ip is required"]
    },

    refreshTokenHash: {
        type: String,
        require: [true, "refresh token is required."]
    },

    userAgent: {
        type: String,
        require: [true, "userAgent is required"]
    },
    revoked: {
        type: Boolean,
        default: false,
    }

})

const SessionModel = mongoose.model("session", SessionSchema);

export default SessionModel;