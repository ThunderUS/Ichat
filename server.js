import express from "express";
//import server from "http";
//import {Server} from "socket.io";
import path from "path";
import cors from "cors";
import userControl from "./controller/user.controller.js"
import Log from "./server/log.js";

const PORT = process.env.PORT || 8080;
const app = express();
//const webServer = server.createServer(app);
//const IO = new Server(webServer);
const __dirname = path.resolve();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, "build")));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

try {

  app.post("/login", userControl.loginUser);
  app.get("/user/list", userControl.getLoginsUsers);
  app.post("/user", userControl.createUser);
  app.post("/rooms", userControl.getRooms);
  app.post("/chats", userControl.getChats);
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  })
} catch (e) {
  Log.setLog(`${e}`);
}


app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    Log.setLog(`${err}`);
  } else {
    Log.setLog(`Server start on ${PORT}`);
  }
});