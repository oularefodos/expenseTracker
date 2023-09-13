import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema ({
    name : {
        type : String,
        required : [true, "The name is required"],
        maxlength : [30, "The maxlength hast to be 30"]
    },
    email : {
        type : String,
        required : [true, "The mail is required"],
        unique : [true, "this email is already in our databse"],
        maxlength : [30, "The maxlength hast to be 30"]
    },
    password : {
        type : String,
        required : [true, "The password is required"],
        minlength : [8, "require more 8 character"]
    },
    balance : {
        type : Number,
        default : 0
    },
    role : {
        type : String,
        enum: ['ADMIN', 'USER'],
        default : 'USER'
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    isVerified : {
        type : Boolean,
        default : false
    }
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;