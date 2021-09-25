import express from "express";
import server from"http";
import {Server} from"socket.io";
import cors from "cors";

const app=express();
const webServer=server.createServer(app);
const IO= new Server(webServer);

app.use(cors());
app.use(express.json());


app.get("/reg",(req,res)=>{
  res.send("fffffffff");
  console.log("good");
});
app.post("/reg",(req,res)=>{
  console.log(req.body);
  res.send({
    id:Math.random()*10,
    status: 200
  });
});

app.listen(9999,(err)=>{
  if(err){
    console.log(err);
  } else {
    console.log("working");
  }
});