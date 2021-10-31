import io from "socket.io-client";
import HOST from "./config";

const socket = io(HOST);

export default socket;