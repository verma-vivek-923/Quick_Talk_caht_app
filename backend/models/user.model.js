import mongoose from "mongoose";
const user_schema=mongoose.Schema({     
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    image:{
        public_id:{
            type:String,
           
        },
        url:{
            type:String,
        }
    },
    // education:{
    //     type:String,
    //     required:true,
    // },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String
    },
    // otp:String,
    // otpExpires:Date,
    // isOtpVerified:Boolean,
    createdAt:{
        type:Date,
        default:Date.now
    }


    }, {timestamps:true}
)
export const user=mongoose.model("users",user_schema)
