const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        profilepic: {
            type: String,
            default: "default.png",
        },
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
            minLength: [4, "Name must be atleast 4 characters long"],
        },
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Username is required"],
            minLength: [4, "Username must be atleast 4 characters long"],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        password: String,
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
        resetPasswordToken: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

userSchema.plugin(plm);

const User = mongoose.model("user", userSchema);
module.exports = User;