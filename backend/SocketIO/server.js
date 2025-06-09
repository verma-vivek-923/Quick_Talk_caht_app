import {Server} from "socket.io"
import http from 'http'
import express from 'express'
import dotenv from "dotenv"

dotenv.config();
const app = express();

const server=http.createServer(app);

const io=new Server(server,{
 cors:{
    origin:process.env.FRONTEND_URL,
    // origin:"http://localhost:5173",
    methods:["GET","POST"]
 }
}) 

//realtime time function 
export const getRecieSocId=(rec_Id)=>{
return online_users[rec_Id]
}


const online_users={}

//listen event of server sidd
io.on("connection",(socket)=>{
    //console.log("connected",socket.id);

    const{ userId}=socket.handshake.query;

if(userId){
online_users[userId]=socket.id;
//console.log(online_users)
}

//send event to all connevted user
io.emit("all_online_users",Object.keys(online_users))

    //listen events emitted by server
    socket.on("disconnect",()=>{
        //console.log("Disconnected",socket.id)
        delete online_users[userId];
        io.emit("all_online_users",Object.keys(online_users))

    })
})

export {app,server,io}

