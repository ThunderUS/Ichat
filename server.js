import express from "express";
import server from"http";
import {Server} from"socket.io";
import cors from "cors";
import userControl from "./controller/user.controller.js"

const PORT=process.env.PORT || 8080;

const app=express();
const webServer=server.createServer(app);
const IO= new Server(webServer);

app.use(cors());
app.use(express.json());

app.post("/user", userControl.createUser)


app.listen(PORT,(err)=>{
  if(err){
    console.log(err);
  } else {
    console.log("working on port "+PORT);
  }
});