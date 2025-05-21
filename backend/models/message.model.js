import mongoose from 'mongoose';

const message_Scheme=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    reciever_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },

},{timestamps:true})

 export const Messages= mongoose.model("message",message_Scheme);


 const conversion_Schema=new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'user',
        }
    ],
    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'message',
            default:[]
        }
    ]
 },{timestamps:true})

 export const Conversions=mongoose.model("conversition",conversion_Schema)