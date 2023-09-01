import { Server } from "socket.io";

const socketServer = new Server(3001,{
    cors:{
        origin:["http://localhost:3000"]
    }
});

socketServer.on("connection", (socket) => {
    socket.on("message", (data) => {
        socket.broadcast.emit("message", data);
    });
    socket.on("join",(roomId,cb)=>{
        socket.join(roomId);
        cb("Joined the room")
    })
    socket.on("broadcastToRoom",({roomId,message})=>{
        socket.join(roomId);
        socket.to(roomId).emit("message",message);
    })
}); 