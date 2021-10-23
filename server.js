import express from "express";
//import server from "http";
//import {Server} from "socket.io";
import * as path from "path";
import cors from "cors";
import userControl from "./controller/user.controller.js"
import Log from "./server/log.js";

const PORT = process.env.PORT || 8080;
const app = express();
//const webServer = server.createServer(app);
//const IO = new Server(webServer);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "ichat/build")));

try {
  app.post("/login", userControl.loginUser);
  app.get("/user/list", userControl.getLoginsUsers);
  app.post("/user", userControl.createUser);
  app.post("/rooms", userControl.getRooms);
  app.post("/chats", userControl.getChats);
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