import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema ({
    name : {
        type : String,
        required : [true, "The name is required"]
    },
    email : {
        type : String,
        required : [true, "The mail is required"],
        unique : [true, "this email is already in our databse"]
    },
    password : {
        type : String,
        required : [true, "The password is required"]
    },
    balance : {
        type : Number,
        default : 0
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('user', userSchema);

module.exports = User;