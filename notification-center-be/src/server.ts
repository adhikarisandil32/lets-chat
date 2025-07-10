import { app } from "./app";
import http from "http";
import { config } from "./config/config";
import { Server } from "socket.io";

const server = http.createServer(app);

const PORT = +config.PORT;

const io = new Server(server, {
  cors: {
    origin: config.ALLOWED_CORS_ORIGINS ?? false,
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connection successful with id: ${socket.id}`);

  // socket.on("message", (message) => {
  //   socket.emit("message", message);
  // });
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(PORT, () => console.log(`[server] Listening at Port ${PORT}`));
