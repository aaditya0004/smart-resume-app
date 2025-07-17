import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"],
        minlength: 6,
    },
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;