import express from "express";
//import server from "http";
//import {Server} from "socket.io";
import cors from "cors";
import userControl from "./controller/user.controller.js"
import Log from "./server/log.js";

const PORT = process.env.PORT || 8080;
const app = express();
//const webServer = server.createServer(app);
//const IO = new Server(webServer);

app.use(cors());
app.use(express.json());

try {
  app.post("/login", userControl.loginUser);
  app.get("/user/list", userControl.getLoginsUsers);
  app.post("/user", userControl.createUser);
  app.post("/rooms",userControl.getRooms);
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