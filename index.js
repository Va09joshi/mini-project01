 const express = require("express");
 const app = express();
 const path = require("path");

 const socketio = require("socket.io");
 const http = require("http");
const { disconnect } = require("process");
 const server = http.createServer(app);
 
 const io =  socketio(server);





 app.set("view engine","ejs")
 app.use(express.json());
 app.use(express.urlencoded({extended : true}));




 app.use(express.static(path.join(__dirname,"public")))


 io.on("connection", (socket)=>{
    socket.on("send-location",(data)=>{
      io.emit("recive-location",{id : socket.id, ...data});
    })
  
    socket.on("discoonect",function(){
        io.emit("user-disconnect", socket.id);
    });
 })


 app.get("/",(req,res)=>{
    res.render("index");
 })

server.listen(9000,()=>{
    console.log("Done");
})